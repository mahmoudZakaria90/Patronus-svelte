import { writable, type Writable } from 'svelte/store';
import { type IUserStore } from './userStore';

interface IModalData {
  value: string;
  count: number;
  reactors: Array<IUserStore>;
}
const modalStore: Writable<{
  showModal: boolean;
  modalData: IModalData;
}> = writable({
  showModal: false,
  modalData: {
    value: '',
    count: 0,
    reactors: [],
  },
});

export default modalStore;
