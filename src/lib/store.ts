import { writable, type Writable } from 'svelte/store';

interface IUserStore {
  displayName: string;
  profilePic: string;
}

const isAuthenticated: Writable<boolean> = writable(false);

const userStore: Writable<IUserStore> = writable({
  displayName: '',
  profilePic: '',
});

const tokenStore: Writable<string> = writable('');

const channelStore: Writable<string> = writable('');

const socketIdStore: Writable<string> = writable('');

export { isAuthenticated, userStore, tokenStore, channelStore, socketIdStore };
