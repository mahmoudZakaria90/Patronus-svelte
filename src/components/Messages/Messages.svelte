<script lang="ts">
  import { isAuthenticated } from '../../lib/store';
  import { messagesStore } from '../../lib/store';
  import MessageItem from './MessageItem.svelte';
</script>

{#if $isAuthenticated}
  <div class="chat">
    {#each $messagesStore as message (message.id)}
      <MessageItem {...message} />
    {/each}
  </div>
{/if}
