<script lang="ts">
  import { onMount } from 'svelte';
  import Loader from './Loader.svelte';

  let loaded = false;

  onMount(() => {
    loaded = true;
  });
</script>

{#if !loaded}
  <Loader />
{/if}

<div class="chat">Chat</div>
