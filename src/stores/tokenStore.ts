import { writable, type Writable } from 'svelte/store';
import { getLocalStorage } from '../utils/storage';

const tokenStore: Writable<string> = writable(
  getLocalStorage('userToken') || '',
);

export default tokenStore;
