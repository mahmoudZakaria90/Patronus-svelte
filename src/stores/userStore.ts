import { writable, type Writable } from 'svelte/store';
import { getLocalStorage } from '../utils/storage';

export interface IUserStore {
  displayName: string;
  profilePic: string;
}

const userStore: Writable<IUserStore> = writable(
  getLocalStorage('userProfile') || {
    displayName: '',
    profilePic: '',
  },
);

export default userStore;
