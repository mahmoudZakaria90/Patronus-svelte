<script lang="ts">
  import { userStore, type Emojis } from '../../lib/store';
  import Emoji from './Emoji.svelte';

  export let id: string;
  export let message: string;
  export let sender: string;
  export let emojis: Emojis;
</script>

<div {id} class="chat-message">
  <p>
    <span class={sender === $userStore.displayName && 'chat-message-self'}
      >{sender}</span
    >
    <span>: {message}</span>
  </p>
  {#each emojis as emoji (emoji.name)}
    <Emoji {...emoji} />
  {/each}
</div>
