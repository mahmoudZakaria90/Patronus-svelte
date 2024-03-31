import { socket } from '.';

export const handleReaction = (e, id, reactionsCount, reactors, user) => {
  const payload = {
    id,
    reactionsCount,
    reactors,
    user,
  };
  if (e.target.checked) {
    socket.emit('addReaction', payload);
    return;
  }
  socket.emit('removeReaction', payload);
};
