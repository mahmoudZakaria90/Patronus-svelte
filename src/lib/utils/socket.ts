import { io } from 'socket.io-client';
import {
  type IUserStore,
  tokenStore,
  socketIdStore,
  messagesStore,
} from '../store';
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
console.log(sockekServerURL);
export const socket = io(sockekServerURL);

socket.on('connect', () => {
  console.log('Socket Id', socket.id);
  socketIdStore.set(socket.id);
});

socket.on('connect_error', (error) => {
  //   const errorMessage = `Patronus, ${error}`;
  //   errorEl.textContent = errorMessage;
  //   throw errorMessage;
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
  console.log(payload);
  messagesStore.update((currentStore) => {
    currentStore.find((messageItem) => {
      if (messageItem.id === payload.id.split('_')[1]) {
        const targetEmoij = messageItem.emojis.find(
          (emoji) => emoji.name === payload.id,
        );
        targetEmoij.count = payload.reactionsCount;
        targetEmoij.reactors = payload.reactors;
      }
    });
    return currentStore;
  });
});
