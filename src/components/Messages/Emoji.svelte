<script lang="ts">
  import { userStore, type IUserStore } from '../../lib/store';
  import { socket, type IPayload } from '../../lib/utils/socket';

  export let name: string;
  export let value: string;
  export let count: number;
  export let reactors: Array<IUserStore>;

  let checked = false;

  function handleChange() {
    const payload: IPayload = {
      id: name,
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
  <input
    type="checkbox"
    {name}
    id={name}
    bind:checked
    on:change={handleChange}
  />
  <label for={name}>{value}</label>
  <span>{count}</span>
</div>
