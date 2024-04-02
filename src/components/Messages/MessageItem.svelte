<script lang="ts">
  import { userStore, type Emojis, type ISender } from '../../stores/store';
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
      style="color: {sender.color || '#3de2db'};font-weight: 700"
      >{sender.displayName}</span
    >
    <span>: {message}</span>
  </p>
  {#each emojis as emoji (emoji.id)}
    <Emoji {...emoji} />
  {/each}
</div>

<style>
  .chat-message {
    margin-bottom: 25px;
  }

  .chat-message > p {
    margin-bottom: 5px;
  }

  .chat-message-self {
    display: inline-block;
    color: black;
    padding: 5px 10px;
    background-color: white;
    border-radius: 10px;
  }
</style>
