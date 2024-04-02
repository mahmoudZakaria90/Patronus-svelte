import { io } from 'socket.io-client';
import {
  type IUserStore,
  tokenStore,
  socketIdStore,
  messagesStore,
  errorStore,
} from '../stores/store';
import { setLocalStorage } from './storage';
import { tmiConnect } from './tmi';

export interface IPayload {
  id: string;
  reactionsCount: number;
  reactors: Array<IUserStore>;
  user: IUserStore;
}

interface IPayloadBackFromServer {
  id: string;
  reactionsCount: number;
  reactors: Array<IUserStore>;
}

export const sockekServerURL =
  import.meta.env.NODE_ENV === 'production'
    ? import.meta.env.VITE_SOCKET_SERVER_URL_PROD
    : import.meta.env.VITE_SOCKET_SERVER_URL_DEV;

export const socket = io(sockekServerURL);

socket.on('connect', () => {
  console.log('Successfully generated a socket Id');
  socketIdStore.set(socket.id);
});

socket.on('connect_error', (error) => {
  errorStore.set(error);
  console.error(error);
});

export const OAuth2TokenSubscribe = (username: string, channelName: string) => {
  socket.on('token', (token) => {
    tokenStore.set(token);
    setLocalStorage('userToken', token);
    if (username && token && channelName) {
      tmiConnect(username, token, channelName);
    }
  });
};

socket.on('addRemoveReactionBack', (payload: IPayloadBackFromServer) => {
  messagesStore.update((currentStore) => {
    currentStore.find((messageItem) => {
      if (messageItem.id === payload.id.split('_')[1]) {
        const targetEmoij = messageItem.emojis.find(
          (emoji) => emoji.id === payload.id,
        );
        targetEmoij.count = payload.reactionsCount;
        targetEmoij.reactors = payload.reactors;
      }
    });
    return currentStore;
  });
});
