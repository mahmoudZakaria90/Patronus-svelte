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
