import { writable, type Writable } from 'svelte/store';
import { getLocalStorage } from './utils/storage';

interface IUserStore {
  displayName: string;
  profilePic: string;
}

type Emojis = Array<{
  id: string;
  value: string;
  count: number;
  reactors: Array<IUserStore>;
}>;

interface ISender {
  displayName: string;
  color?: string;
}

interface IMessage {
  id: string;
  message: string;
  sender: ISender;
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
    sender: {
      displayName: 'Zak',
    },
    emojis: [
      { id: `thumbsUp_1`, value: '👍', count: 0, reactors: [] },
      { id: `love_1`, value: '❤️', count: 0, reactors: [] },
      { id: `laugh_1`, value: '😂', count: 0, reactors: [] },
      { id: `sad_1`, value: '😢', count: 0, reactors: [] },
      { id: `surprised_1`, value: '😵', count: 0, reactors: [] },
      { id: `angry_1`, value: '😡', count: 0, reactors: [] },
    ],
  },

  {
    id: '2',
    message: 'ahlan',
    sender: {
      displayName: 'Ola',
      color: '#333',
    },
    emojis: [
      { id: `thumbsUp_2`, value: '👍', count: 0, reactors: [] },
      { id: `love_2`, value: '❤️', count: 0, reactors: [] },
      { id: `laugh_2`, value: '😂', count: 0, reactors: [] },
      { id: `sad_2`, value: '😢', count: 0, reactors: [] },
      { id: `surprised_2`, value: '😵', count: 0, reactors: [] },
      { id: `angry_2`, value: '😡', count: 0, reactors: [] },
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
  type ISender,
};
