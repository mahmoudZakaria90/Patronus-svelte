<script lang="ts">
  import { isAuthenticated, userStore } from '$stores/store';
</script>

{#if $isAuthenticated}
  <div class="logged-in-text">
    <img src={$userStore.profilePic} alt="" />
    <a target="_blank" href={`https://twitch.tv/${$userStore.displayName}`}
      >{$userStore.displayName}</a
    >
  </div>
{/if}
