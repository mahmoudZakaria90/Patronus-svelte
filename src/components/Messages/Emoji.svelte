<script lang="ts">
  import { userStore, type IUserStore, modalStore } from '../../stores/store';
  import { socket, type IPayload } from '../../utils/socket';

  export let id: string;
  export let value: string;
  export let count: number;
  export let reactors: Array<IUserStore>;

  let checked = false;

  function handleChange() {
    const payload: IPayload = {
      id,
      reactionsCount: count,
      reactors,
      user: $userStore,
    };
    if (checked) {
      socket.emit('addReaction', payload);
      return;
    }
    socket.emit('removeReaction', payload);
  }

  function handleClick() {
    if (!Number(count)) return;
    modalStore.set({
      showModal: true,
      modalData: {
        value,
        count,
        reactors,
      },
    });
  }
</script>

<div class="chat-message-reaction">
  <input type="checkbox" {id} bind:checked on:change={handleChange} />
  <label for={id}>{value}</label>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <span
    class="reactors-list-button {Number(count) && 'reactors-list-button-caret'}"
    on:click={handleClick}>{count}</span
  >
</div>

<style>
  input[type='checkbox'] {
    position: absolute;
    left: -99999999px;
  }

  input[type='checkbox']:checked + label {
    background-color: #581faf;
  }
  .chat-message-reaction {
    display: inline-block;
    margin-right: 13px;
    text-align: center;
  }

  .chat-message-reaction:last-of-type {
    margin-right: 0;
  }

  .chat-message-reaction > label {
    -ms-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    cursor: pointer;
    padding: 0 4px;
    display: block;
  }
  .reactors-list-button {
    position: relative;
    display: block;
    font-size: 14px;
    user-select: none;
    text-align: center;
    cursor: pointer;
  }
  .reactors-list-button-caret {
    text-decoration: underline;
  }
  .reactors-list-button-caret:before {
    content: '';
    position: absolute;
    right: 0px;
    top: 0px;
    width: 0;
    height: 0;
    border: 3px solid transparent;
    border-bottom-color: black;
    transform: rotate(45deg);
  }
</style>
