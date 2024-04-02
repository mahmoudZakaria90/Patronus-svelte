<script lang="ts">
  import { userStore, type IUserStore } from '../../stores/store';
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
</script>

<div class="chat-message-reaction">
  <input type="checkbox" {id} bind:checked on:change={handleChange} />
  <label for={id}>{value}</label>
  <span>{count}</span>
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
</style>
