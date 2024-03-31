<script lang="ts">
  import { onMount } from 'svelte';
  import { isAuthenticated } from '../lib/store';
  import AuthButton from './Auth/AuthButton.svelte';
  import Loader from './Loader.svelte';

  let loaded = false;

  onMount(() => {
    loaded = true;
  });
</script>

{#if !loaded}
  <Loader />
{/if}

<div class="chat">
  <AuthButton />
</div>
