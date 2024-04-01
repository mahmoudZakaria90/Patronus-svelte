<script lang="ts">
  import { sockekServerURL } from '../../lib/utils/socket';
  import { isAuthenticated, isLoading, socketIdStore } from '../../lib/store';
  import Loader from '../Loader.svelte';
</script>

{#if $isLoading}
  <Loader />
{/if}

{#if !$isAuthenticated && !$isLoading}
  <a
    href={`${sockekServerURL}/login?state=${$socketIdStore}`}
    class="auth-link"
    target="_blank"
  >
    Auth with Twitch
  </a>
{/if}
