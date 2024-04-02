export { default as messagesStore } from './messagesStore';
export { default as isLoading } from './loadingStore';
export { default as isAuthenticated } from './authStore';
export { default as socketIdStore } from './socketStore';
export { default as userStore, type IUserStore } from './userStore';
export { default as tokenStore } from './tokenStore';
export { default as channelStore } from './channelStore';
import { type IUserStore } from './userStore';

type Emojis = Array<{
  id: string;
  value: string;
  count: number;
  reactors: Array<IUserStore>;
}>;

interface ISender {
  displayName: string;
  color?: string;
}

export { type Emojis, type ISender };
