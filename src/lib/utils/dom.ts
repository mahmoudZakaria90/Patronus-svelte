// import svgString from './svg';
// import { handleReaction } from './handlers';
// import { socket, sockekServerURL } from './socket';
// import { getLocalStorage } from './storage';
// import { modifyProfilePicSize } from './utils';

// export const chat = document.querySelector('#chat');
// export const sendMessageForm = document.querySelector('#send-message-form');
// export const sendMessageInput = document.querySelector('#send-message-input');
// export const reactorsListOverlay = document.querySelector(
//   '#reactors-list-overlay',
// );
// export const errorEl = document.querySelector('#error');

// const reactorsListClose = document.querySelector('#reactors-list-close');
// const logo = document.querySelector('#logo');

// const reactions = [
//   { name: 'thumbsUp', value: '👍' },
//   { name: 'love', value: '❤️' },
//   { name: 'laugh', value: '😂' },
//   { name: 'sad', value: '😢' },
//   { name: 'surprised', value: '😵' },
//   { name: 'angry', value: '😡' },
// ];

// export const createMessageTemplate = (user, message, self) => {
//   const wrapper = document.createElement('div');
//   wrapper.className = 'chat-message';

//   const messageWrapper = document.createElement('p');
//   const userWrapper = document.createElement('span');
//   const textWrapper = document.createElement('span');

//   userWrapper.style.color = user.color;
//   userWrapper.className = self ? 'chat-message-self' : '';

//   userWrapper.textContent = `${user['display-name'] || 'Action'}`;

//   textWrapper.textContent = `: ${message}`;
//   textWrapper.id = `message-${user.id}`;
//   textWrapper.setAttribute('name', `${user['display-name']}-${message}`);

//   messageWrapper.append(userWrapper, textWrapper);

//   const reactionsMapping = reactions.map(({ name, value }) => {
//     const reactionWrapper = document.createElement('div');
//     reactionWrapper.className = 'chat-message-reaction';

//     const checkboxLabel = document.createElement('label');
//     const id = `${name}-${user.id}`;
//     checkboxLabel.setAttribute('for', id);
//     checkboxLabel.textContent = value;

//     const checkbox = document.createElement('input');
//     checkbox.type = 'checkbox';
//     checkbox.id = id;
//     checkbox.dataset.reactionsCount = 0;
//     checkbox.dataset.reactors = JSON.stringify([]);
//     checkbox.addEventListener('change', (e) => {
//       const userData = getLocalStorage('user_data');
//       handleReaction(
//         e,
//         checkbox.id,
//         checkbox.dataset.reactionsCount,
//         checkbox.dataset.reactors,
//         userData.user,
//       );
//     });

//     const reactorsListCreate = (reactionId) => {
//       const reactorsListWrapper = document.createElement('div');
//       reactorsListWrapper.className = 'reactors-list-wrapper';

//       const reactorsListTitle = document.createElement('p');
//       const reactorsListTitleContent = document.createElement('strong');
//       const reactorsListLength = document.createElement('strong');
//       reactorsListLength.id = `reactors-list-length-${reactionId}`;

//       const parsedVoters = JSON.parse(checkbox.dataset.reactors);
//       reactorsListLength.textContent = parsedVoters.length;
//       reactorsListTitle.textContent = ` People reacted ${value} to `;
//       reactorsListTitleContent.textContent = message;
//       reactorsListTitle.prepend(reactorsListLength);
//       reactorsListTitle.appendChild(reactorsListTitleContent);

//       const reactorsListContent = document.createElement('ul');
//       reactorsListContent.id = `reactors-list-content-${reactionId}`;
//       reactorsListContent.className = 'reactors-list-content';

//       reactorsListContent.append(...updateVoters(parsedVoters));

//       reactorsListWrapper.append(reactorsListTitle, reactorsListContent);

//       return reactorsListWrapper;
//     };

//     const reactionsCountsEl = document.createElement('span');
//     reactionsCountsEl.id = `${id}-counts`;
//     reactionsCountsEl.className = 'reactors-list-button';
//     reactionsCountsEl.textContent = 0;

//     reactionsCountsEl.addEventListener('click', function () {
//       const counts = Number(this.textContent);
//       if (counts === 0) return;
//       showVoters(reactorsListCreate(id));
//     });

//     reactionWrapper.append(checkbox, checkboxLabel, reactionsCountsEl);
//     return reactionWrapper;
//   });

//   const line = document.createElement('span');
//   line.className = 'line';

//   wrapper.append(messageWrapper, ...reactionsMapping, line);

//   return wrapper;
// };

// export const updateVoters = (reactors) => {
//   const returnedVoters = reactors.map((reactor) => {
//     const li = document.createElement('li');
//     li.className = 'reactor';
//     const span = document.createElement('span');
//     const img = document.createElement('img');
//     span.textContent = reactor.display_name;
//     img.src = modifyProfilePicSize(reactor.profilePic);
//     li.append(img, span);
//     return li;
//   });
//   return returnedVoters;
// };

// export const createLoggedInText = () => {
//   if (document.querySelector('#logged-in-text')) return;
//   const userData = getLocalStorage('user_data');
//   const username = userData.user.display_name;
//   const loggedInText = document.createElement('div');
//   const profilePic = document.createElement('img');
//   const profilePicSrc = userData.user.profile_image_url.replace();
//   const anchor = document.createElement('a');

//   loggedInText.id = 'logged-in-text';
//   anchor.id = 'logged-in-user';
//   anchor.href = `https://twitch.tv/${username}`;
//   anchor.target = '_blank';
//   profilePic.src = modifyProfilePicSize(profilePicSrc);
//   anchor.textContent = username;
//   loggedInText.append(profilePic, anchor);
//   document.body.insertBefore(loggedInText, logo);
// };

// export const createAuthLink = () => {
//   const authLink = document.createElement('a');
//   authLink.id = 'auth-link';
//   authLink.target = '_blank';
//   authLink.textContent = 'Auth with Twitch';
//   authLink.href = `${sockekServerURL}/login?state=${socket.id}`;
//   removeLoadingState();
//   chat.appendChild(authLink);
// };

// export const removeAuthLink = () => {
//   const authLink = document.querySelector('#auth-link');
//   if (authLink) chat.removeChild(authLink);
// };

// export const createLoadingState = () => {
//   const svg = document.createElement('div');
//   svg.id = 'loading-state';
//   svg.innerHTML = svgString;
//   document.body.insertBefore(svg, chat);
// };

// export const removeLoadingState = () => {
//   const target = document.querySelector('#loading-state');
//   if (target) document.body.removeChild(target);
// };

// const showVoters = (content) => {
//   reactorsListOverlay.classList.add('reactors-list-overlay-show');
//   reactorsListOverlay.appendChild(content);
// };

// reactorsListOverlay.addEventListener('click', (event) => {
//   if (
//     event.target !== event.currentTarget &&
//     event.target !== reactorsListClose
//   ) {
//     return;
//   }
//   const reactorsListWrapper = document.querySelector('.reactors-list-wrapper');
//   event.currentTarget.classList.remove('reactors-list-overlay-show');
//   reactorsListOverlay.removeChild(reactorsListWrapper);
// });

// document.addEventListener('keydown', (event) => {
//   if (event.key !== 'Escape' && event.which !== 27 && event.keyCode !== 27) {
//     return;
//   }
//   const reactorsListWrapper = document.querySelector('.reactors-list-wrapper');
//   reactorsListOverlay.classList.remove('reactors-list-overlay-show');
//   reactorsListOverlay.removeChild(reactorsListWrapper);
// });

// export const removeErrorEl = () => {
//   if (errorEl.textContent) errorEl.textContent = '';
// };
