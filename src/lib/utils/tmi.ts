import tmi from 'tmi.js';
import { isAuthenticated } from '../store';

const tmiOptions: any = {
  options: {
    debug: true,
  },
  connection: {
    reconnect: false,
  },
};

export const tmiConnect = (username, token, channel) => {
  tmiOptions.identity = {
    username,
    password: `oauth:${token}`,
  };

  tmiOptions.channels = [channel];

  const client = new tmi.Client(tmiOptions);

  client.connect().catch((err) => {
    console.error(err);
  });

  isAuthenticated.set(true);
  // client.on(clientChannel, user, message) => {
  //   const self = user.username === userData.user.display_name;
  //   chat.appendChild(createMessageTemplate(user, message, self));
  //   chat.scrollTop = chat.scrollHeight;
  // });

  // client.on(
  //   'messagedeleted',
  //   (clientChannel, username, deletedMessage, userstate) => {
  //     const targetMsgById = document.querySelector(
  //       `#message-${userstate['target-msg-id']}`,
  //     );
  //     if (targetMsgById) {
  //       targetMsgById.textContent =
  //         ': Your message was deleted by the moderator.';
  //     }
  //   },
  // );

  // client.on('connected', () => {
  //   removeLoadingState();
  //   removeErrorEl();
  //   createLoggedInText(userData.user.display_name);
  //   sendMessageInput.style.display = 'block';

  //   sendMessageForm.addEventListener('submit', (event) => {
  //     event.preventDefault();
  //     const input = sendMessageInput;
  //     const inputValue = input.value;
  //     if (inputValue) {
  //       socket.emit('messageInExt', {
  //         user: {
  //           'display-name': userData.user.display_name,
  //           color: '',
  //           socketId: socket.id,
  //         },
  //         message: inputValue,
  //       });
  //     }
  //     input.value = '';
  //   });

  //   socket.on('messageInExtBackToAll', ({ user, message }) => {
  //     const self = user['display-name'] === userData.user.display_name;
  //     chat.appendChild(createMessageTemplate(user, message, self));
  //     chat.scrollTop = chat.scrollHeight;
  //   });
  //   socket.on('messageInExtBackToSocket', (message) => {
  //     client.action(tmiOptions.channels[0], message);
  //   });
  // });
};
