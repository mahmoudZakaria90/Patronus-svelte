<script lang="ts">
  import Header from './components/Header.svelte';
  import Messages from './components/Messages/Messages.svelte';
  import AuthButton from './components/Auth/AuthButton.svelte';
  import Modal from './components/Modal.svelte';

  import { OAuth2TokenSubscribe } from './utils/socket';
  import { getBroadcastInfo, getUserInfo } from './utils/getInfo';
  import { addHeaders } from './utils/rest';
  import {
    userStore,
    channelStore,
    tokenStore,
    isLoading,
    errorStore,
  } from './stores/store';
  import { tmiConnect } from './utils/tmi';
  import { setLocalStorage } from './utils/storage';
  import { modalStore } from './stores/store';

  let userData;
  let authToken;
  let channelName;

  userStore.subscribe((user) => (userData = user));
  tokenStore.subscribe((token) => (authToken = token));
  channelStore.subscribe((channel) => (channelName = channel));

  window.Twitch.ext.onAuthorized(async (twitch) => {
    if (!window.Twitch.ext.viewer.id) {
      console.log('window.Twitch.ext.viewer.id', window.Twitch.ext.viewer.id);
      errorStore.set(401);
    }
    const channelNameResult = await getBroadcastInfo(
      twitch.channelId,
      addHeaders(twitch.helixToken),
    );
    channelStore.set(channelNameResult.data[0].broadcaster_login);

    const userDataResult = await getUserInfo(
      window.Twitch.ext.viewer.id,
      addHeaders(twitch.helixToken),
    );

    const userProfile = {
      displayName: userDataResult.data[0].display_name,
      profilePic: userDataResult.data[0].profile_image_url,
    };

    userStore.set(userProfile);

    if (userData && authToken && channelName) {
      tmiConnect(userData.displayName, authToken, channelName);
      return;
    }

    isLoading.set(false);

    OAuth2TokenSubscribe(userData.displayName, channelName);
  });
</script>

<main>
  <Header />
  <AuthButton />
  <Messages />
  <Modal showModal={$modalStore.showModal} modalData={$modalStore.modalData} />
</main>
