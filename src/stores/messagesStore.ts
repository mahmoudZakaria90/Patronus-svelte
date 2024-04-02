import { writable, type Writable } from 'svelte/store';
import { type ISender, type Emojis } from './store';

interface IMessage {
  id: string;
  message: string;
  sender: ISender;
  emojis: Emojis;
}

const messagesStore: Writable<Array<IMessage>> = writable([
  {
    id: '1',
    message: 'holli',
    sender: {
      displayName: 'Zak',
    },
    emojis: [
      { id: `thumbsUp_1`, value: '👍', count: 0, reactors: [] },
      { id: `love_1`, value: '❤️', count: 0, reactors: [] },
      { id: `laugh_1`, value: '😂', count: 0, reactors: [] },
      { id: `sad_1`, value: '😢', count: 0, reactors: [] },
      { id: `surprised_1`, value: '😵', count: 0, reactors: [] },
      { id: `angry_1`, value: '😡', count: 0, reactors: [] },
    ],
  },

  {
    id: '2',
    message: 'ahlan',
    sender: {
      displayName: 'Ola',
      color: '#333',
    },
    emojis: [
      { id: `thumbsUp_2`, value: '👍', count: 0, reactors: [] },
      { id: `love_2`, value: '❤️', count: 0, reactors: [] },
      { id: `laugh_2`, value: '😂', count: 0, reactors: [] },
      { id: `sad_2`, value: '😢', count: 0, reactors: [] },
      { id: `surprised_2`, value: '😵', count: 0, reactors: [] },
      { id: `angry_2`, value: '😡', count: 0, reactors: [] },
    ],
  },
]);

export default messagesStore;
