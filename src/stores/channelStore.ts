import { writable, type Writable } from 'svelte/store';

const channelStore: Writable<string> = writable('');

export default channelStore;
