import { writable, type Writable } from 'svelte/store';

const socketIdStore: Writable<string> = writable('');

export default socketIdStore;
