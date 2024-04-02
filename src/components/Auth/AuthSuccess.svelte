<script lang="ts">
  import { isAuthenticated, userStore } from '../../stores/store';

  function handleChange(e) {
    document.body.style.backgroundColor = e.target.value;
  }
</script>

<input type="color" on:input={handleChange} />

{#if $isAuthenticated}
  <div class="logged-in-text">
    <img src={$userStore.profilePic} alt="" />
    <a target="_blank" href={`https://twitch.tv/${$userStore.displayName}`}
      >{$userStore.displayName}</a
    >
  </div>
{/if}

<style>
  input[type='color'] {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 99999;
  }

  .logged-in-text {
    margin: 0 0 15px;
  }

  .logged-in-text > img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }
</style>
