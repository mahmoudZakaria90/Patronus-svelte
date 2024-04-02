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
    href={`${sockekServerURL}/login?state=${$socketIdStore}`}
    class="auth-link"
    target="_blank"
  >
    Auth with Twitch
  </a>
{/if}

<style>
  .auth-link {
    display: block;
    text-align: center;
    color: white;
    background-color: #5714bb;
    text-decoration: none;
    padding: 10px 15px;
    border-radius: 15px;
  }
</style>
