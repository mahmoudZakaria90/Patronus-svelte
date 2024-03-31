<script lang="ts">
  import { sockekServerURL } from '../../lib/utils/socket';

  import { isAuthenticated, socketIdStore } from '../../lib/store';
</script>

{#if !$isAuthenticated}
  <a
    href={`${sockekServerURL}/login?state=${$socketIdStore}`}
    class="auth-link"
    target="_blank"
  >
    Auth with Twitch
  </a>
{/if}
