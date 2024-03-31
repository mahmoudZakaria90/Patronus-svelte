/// <reference types="svelte" />
/// <reference types="vite/client" />

export {};

declare global {
  interface Window {
    Twitch: any;
  }
}
