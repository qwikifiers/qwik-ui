import { component$ } from '@builder.io/qwik';

export default component$(() => {
  const users = ['Tim', 'Ryan', 'Jim', 'Jessie', 'Abby'];

  return (
    <select multiple size={3}>
      {users.map((user) => (
        <option key={user}>{user}</option>
      ))}
    </select>
  );
});
