import { simpleGETClient } from './rest';
import { userStore, channelStore } from '../stores/store';
import { setLocalStorage } from './storage';

interface ITwitchUserInfo {
  data: Array<{ display_name: string; profile_image_url: string }>;
}

interface ITwitchChannelInfo {
  data: Array<{ broadcaster_login: string }>;
}

export const getBroadcastInfo = async (id, headers) =>
  await simpleGETClient<ITwitchChannelInfo>({
    endpoint: '/channels',
    options: {
      query: {
        broadcaster_id: id,
      },
      headers,
    },
  });

export const getUserInfo = async (id, headers) =>
  simpleGETClient<ITwitchUserInfo>({
    endpoint: '/users',
    options: {
      query: {
        id,
      },
      headers,
    },
  });
