export const modifyProfilePicSize = (
  str,
  target = '300x300.png',
  newStr = '50x50.png',
) => str.replace(target, newStr);

export const wrapWithTwitchURL = (str: string) => `https://twitch.tv/${str}`;
