<script lang="ts">
  import { isAuthenticated, messagesStore } from '../../stores/store';
  import MessageItem from './MessageItem.svelte';

  let chatEl;

  messagesStore.subscribe(() => {
    if (chatEl) {
      chatEl.scrollTop = chatEl.scrollHeight;
    }
  });
</script>

{#if $isAuthenticated}
  <div class="chat" bind:this={chatEl}>
    {#each $messagesStore as message (message.id)}
      <MessageItem {...message} />
    {/each}
  </div>
{/if}

<style>
  .chat {
    position: relative;
    height: 450px;
    overflow: auto;
  }
</style>
