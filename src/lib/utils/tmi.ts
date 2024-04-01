import tmi from 'tmi.js';
import { isAuthenticated, isLoading, messagesStore } from '../store';
import { removeLocalStorage } from './storage';

interface ITmiOptions {
  options?: {
    debug: boolean;
  };
  connection?: {
    reconnect: boolean;
  };
  identity?: {
    username: string;
    password: string;
  };
  channels?: Array<string>;
}

const tmiOptions: ITmiOptions = {
  options: {
    debug: true,
  },
  connection: {
    reconnect: false,
  },
};

export const tmiConnect = (username, token, channel) => {
  tmiOptions.identity = {
    username,
    password: `oauth:${token}`,
  };

  tmiOptions.channels = [channel];

  const client = new tmi.Client(tmiOptions);

  client.connect().catch((err) => {
    isAuthenticated.set(false);
    isLoading.set(false);
    removeLocalStorage('userProfile');
    removeLocalStorage('userToken');
    console.error(err);
  });

  client.on('connected', () => {
    isAuthenticated.set(true);
    isLoading.set(false);
  });

  client.on('chat', (clientChannel, user, message) => {
    messagesStore.update((current) => {
      const newMessage = {
        id: user.id,
        message,
        sender: user['display-name'],
        emojis: [
          { name: `thumbsUp_${user.id}`, value: '👍', count: 0, reactors: [] },
          { name: `love_${user.id}`, value: '❤️', count: 0, reactors: [] },
          { name: `laugh_${user.id}`, value: '😂', count: 0, reactors: [] },
          { name: `sad_${user.id}`, value: '😢', count: 0, reactors: [] },
          { name: `surprised_${user.id}`, value: '😵', count: 0, reactors: [] },
          { name: `angry_${user.id}`, value: '😡', count: 0, reactors: [] },
        ],
      };
      return [...current, newMessage];
    });
  });
};
