import { writable, type Writable } from 'svelte/store';
import { getLocalStorage } from './utils/storage';

interface IUserStore {
  displayName: string;
  profilePic: string;
}

type Emojis = Array<{
  name: string;
  value: string;
  count: number;
  reactors: Array<IUserStore>;
}>;

interface IMessage {
  id: string;
  message: string;
  sender: string;
  emojis: Emojis;
}

const isAuthenticated: Writable<boolean> = writable(false);
const isLoading: Writable<boolean> = writable(true);

const userStore: Writable<IUserStore> = writable(
  getLocalStorage('userProfile') || {
    displayName: '',
    profilePic: '',
  },
);

const tokenStore: Writable<string> = writable(
  getLocalStorage('userToken') || '',
);

const channelStore: Writable<string> = writable('');

const socketIdStore: Writable<string> = writable('');

const messagesStore: Writable<Array<IMessage>> = writable([
  {
    id: '1',
    message: 'holli',
    sender: 'Zak',
    emojis: [
      { name: `thumbsUp_1`, value: '👍', count: 0, reactors: [] },
      { name: `love_1`, value: '❤️', count: 0, reactors: [] },
      { name: `laugh_1`, value: '😂', count: 0, reactors: [] },
      { name: `sad_1`, value: '😢', count: 0, reactors: [] },
      { name: `surprised_1`, value: '😵', count: 0, reactors: [] },
      { name: `angry_1`, value: '😡', count: 0, reactors: [] },
    ],
  },

  {
    id: '2',
    message: 'ahlan',
    sender: 'ola',
    emojis: [
      { name: `thumbsUp_2`, value: '👍', count: 0, reactors: [] },
      { name: `love_2`, value: '❤️', count: 0, reactors: [] },
      { name: `laugh_2`, value: '😂', count: 0, reactors: [] },
      { name: `sad_2`, value: '😢', count: 0, reactors: [] },
      { name: `surprised_2`, value: '😵', count: 0, reactors: [] },
      { name: `angry_2`, value: '😡', count: 0, reactors: [] },
    ],
  },
]);

export {
  isAuthenticated,
  isLoading,
  userStore,
  tokenStore,
  channelStore,
  socketIdStore,
  messagesStore,
  type IUserStore,
  type Emojis,
};
