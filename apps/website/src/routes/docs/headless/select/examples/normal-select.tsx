import { component$, useSignal } from '@builder.io/qwik';

export default component$(() => {
  const usersSig = useSignal<string[]>(['Tim', 'Ryan', 'Jim', 'Jessie', 'Abby']);

  return (
    <select multiple size={3}>
      {usersSig.value.map((user) => (
        <option key={user}>{user}</option>
      ))}
    </select>
  );
});
