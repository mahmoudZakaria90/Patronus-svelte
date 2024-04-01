<script lang="ts">
  import Header from './components/Header.svelte';
  import Messages from './components/Messages/Messages.svelte';
  import AuthButton from './components/Auth/AuthButton.svelte';

  import { OAuth2TokenSubscribe } from './lib/utils/socket';
  import { getBroadcastInfo, getUserInfo } from './lib/utils/getInfo';
  import { addHeaders } from './lib/utils/rest';
  import { userStore, channelStore, tokenStore, isLoading } from './lib/store';
  import { tmiConnect } from './lib/utils/tmi';
  import { getLocalStorage, setLocalStorage } from './lib/utils/storage';

  let userData;
  let authToken;
  let channelName;

  userStore.subscribe((user) => (userData = user));
  tokenStore.subscribe((token) => (authToken = token));
  channelStore.subscribe((channel) => (channelName = channel));

  window.Twitch.ext.onAuthorized(async (twitch) => {
    const channelNameResult = await getBroadcastInfo(
      twitch.channelId,
      addHeaders(twitch.helixToken),
    );
    channelStore.set(channelNameResult.data[0].broadcaster_login);

    if (userData && authToken && channelName) {
      tmiConnect(userData.displayName, authToken, channelName);
      return;
    }

    const userDataResult = await getUserInfo(
      window.Twitch.ext.viewer.id,
      addHeaders(twitch.helixToken),
    );

    isLoading.set(false);

    const userProfile = {
      displayName: userDataResult.data[0].display_name,
      profilePic: userDataResult.data[0].profile_image_url,
    };

    userStore.set(userProfile);
    setLocalStorage('userProfile', userProfile);

    OAuth2TokenSubscribe(userData.displayName, channelName);
  });
</script>

<main>
  <Header />

  <AuthButton />

  <Messages />
</main>
