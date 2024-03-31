import { writable, type Writable } from 'svelte/store';
import { getLocalStorage } from './utils/storage';

interface IUserStore {
  displayName: string;
  profilePic: string;
}

const isAuthenticated: Writable<boolean> = writable(
  getLocalStorage('userToken') ? true : false,
);

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

export { isAuthenticated, userStore, tokenStore, channelStore, socketIdStore };
