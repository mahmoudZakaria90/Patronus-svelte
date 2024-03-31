import { io } from 'socket.io-client';
import { tokenStore, socketIdStore } from '../../store';
import { setLocalStorage } from '../storage';
import { tmiConnect } from '../tmi';

// import { removeAuthLink, updateVoters, errorEl, removeErrorEl } from './dom';
// import { setLocalStorage } from './storage';
// import { tmiConnect } from './tmi';

export const sockekServerURL =
  import.meta.env.NODE_ENV === 'production'
    ? import.meta.env.VITE_SOCKET_SERVER_URL_PROD
    : import.meta.env.VITE_SOCKET_SERVER_URL_DEV;

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

export const OAuth2TokenSubscribe = (username, channelName) => {
  socket.on('token', (token) => {
    tokenStore.set(token);
    setLocalStorage('userToken', token);
    if (username && token && channelName) {
      tmiConnect(username, token, channelName);
    }
  });
};

// socket.on('addRemoveReactionBack', (payload) => {
//   const reactionEl = document.querySelector(`#${payload.id}`);
//   const reactionCountsEl = document.querySelector(`#${payload.id}-counts`);
//   const reactorsUl = document.querySelector(
//     `#reactors-list-content-${payload.id}`,
//   );
//   const reactorsListLen = document.querySelector(
//     `#reactors-list-length-${payload.id}`,
//   );
//   reactionEl.dataset.reactionsCount = payload.reactionsCount;
//   reactionEl.dataset.reactors = payload.reactors;
//   reactionCountsEl.textContent = payload.reactionsCount;
//   if (reactorsUl) {
//     const reactors = JSON.parse(payload.reactors);
//     reactorsUl.textContent = '';
//     reactorsUl.append(...updateVoters(reactors));
//     reactorsListLen.textContent = reactors.length;
//   }
// });
