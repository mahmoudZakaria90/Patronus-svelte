<script lang="ts">
  import Header from './components/Header.svelte';

  import { OAuth2TokenSubscribe, socket } from './lib/utils/socket';
  import { getBroadcastInfo, getUserInfo } from './lib/utils/getInfo';
  import { addHeaders } from './lib/utils/rest';
  import { userStore, channelStore } from './lib/store';
  import { tmiConnect } from './lib/utils/tmi';
  import { setLocalStorage } from './lib/utils/storage';
  import Messages from './components/Messages.svelte';

  let userData;
  let channelName;

  userStore.subscribe((user) => (userData = user));
  channelStore.subscribe((channel) => (channelName = channel));

  window.Twitch.ext.onAuthorized(async (twitch) => {
    const userDataResult = await getUserInfo(
      window.Twitch.ext.viewer.id,
      addHeaders(twitch.helixToken),
    );

    const userProfile = {
      displayName: userDataResult.data[0].display_name,
      profilePic: userDataResult.data[0].profile_image_url,
    };

    userStore.set(userProfile);
    setLocalStorage('userProfile', userProfile);

    const channelNameResult = await getBroadcastInfo(
      twitch.channelId,
      addHeaders(twitch.helixToken),
    );
    channelStore.set(channelNameResult.data[0].broadcaster_login);

    // bootstrap in case of access token stored
    console.log(userData.displayName, channelName);

    OAuth2TokenSubscribe(userData.displayName, channelName);
  });
</script>

<main>
  <Header />
  <Messages />
</main>
