<script lang="ts">
  import { wrapWithTwitchURL } from '../utils/replace';
  import modalStore from '../stores/modalStore';

  export let showModal;
  export let modalData;

  function handleClose() {
    $modalStore.showModal = false;
  }
</script>

{#if showModal}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="reactors-list-overlay" on:click|self={handleClose}>
    <div on:click|stopPropagation class="reactors-list-wrapper">
      <p><strong>{modalData.count}</strong> people reacted {modalData.value}</p>
      <ul class="reactors-list-content">
        {#each modalData.reactors as reactor}
          <li class="reactor">
            <a target="_blank" href={wrapWithTwitchURL(reactor.displayName)}>
              <img src={reactor.profilePic} alt="" />
              <span>{reactor.displayName}</span>
            </a>
          </li>
        {/each}
      </ul>
      <button type="button" class="reactors-list-close" on:click={handleClose}
        >Close</button
      >
    </div>
  </div>
{/if}

<style>
  .reactors-list-overlay {
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(30, 30, 30, 0.8);
    z-index: 999999999;
  }

  .reactors-list-wrapper {
    width: 280px;
    height: 250px;
    background-color: white;
    margin: auto;
    padding: 15px;
    color: black;
    overflow: auto;
  }

  .reactors-list-wrapper > p {
    margin-bottom: 15px;
  }

  .reactors-list-close {
    position: absolute;
    top: 15px;
    right: 15px;
    border: none;
    background-color: transparent;
    color: white;
  }

  .reactors-list-content {
    list-style: none;
  }

  .reactor {
    margin-bottom: 15px;
    padding: 0 15px;
  }

  .reactor > a > img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }

  .reactor > a > span {
    margin-left: 10px;
  }
</style>
