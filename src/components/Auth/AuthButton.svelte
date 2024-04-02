<script lang="ts">
  import { sockekServerURL } from '../../utils/socket';
  import {
    isAuthenticated,
    isLoading,
    socketIdStore,
  } from '../../stores/store';
  import Loader from '../Loader.svelte';
</script>

{#if $isLoading}
  <Loader />
{/if}

{#if !$isAuthenticated && !$isLoading}
  <a
    href={`${sockekServerURL}/login?state=${socketIdStore}`}
    class="auth-link"
    target="_blank"
  >
    Auth with Twitch
  </a>
{/if}
