import { writable, type Writable } from 'svelte/store';

const isLoading: Writable<boolean> = writable(true);

export default isLoading;
