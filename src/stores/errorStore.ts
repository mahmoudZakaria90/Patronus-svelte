import { writable, type Writable } from 'svelte/store';

const errorStore: Writable<Error | number> = writable();

export default errorStore;
