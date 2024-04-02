import { writable, type Writable } from 'svelte/store';

const errorStore: Writable<Error> = writable();

export default errorStore;
