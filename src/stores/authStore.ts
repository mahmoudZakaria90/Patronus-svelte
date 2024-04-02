import { writable, type Writable } from 'svelte/store';

const isAuthenticated: Writable<boolean> = writable(false);

export default isAuthenticated;
