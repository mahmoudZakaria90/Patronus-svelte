<script lang="ts">
  import { onMount } from 'svelte';
  import Loader from './Loader.svelte';
  import { isAuthenticated } from '../lib/store';
</script>

{#if $isAuthenticated}
  <div class="chat">Chat</div>
{/if}
