<script lang="ts">
  import { userStore, type Emojis, type ISender } from '$stores/store';
  import Emoji from './Emoji.svelte';

  export let id: string;
  export let message: string;
  export let sender: ISender;
  export let emojis: Emojis;
</script>

<div id={`message_${id}`} class="chat-message">
  <p>
    <span
      class={sender.displayName === $userStore.displayName &&
        'chat-message-self'}
      style="color: {sender.color}">{sender.displayName}</span
    >
    <span>: {message}</span>
  </p>
  {#each emojis as emoji (emoji.id)}
    <Emoji {...emoji} />
  {/each}
</div>
