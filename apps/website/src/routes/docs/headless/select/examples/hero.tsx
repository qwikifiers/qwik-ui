import { $, component$, useSignal, useTask$ } from '@builder.io/qwik';
import { Select, SelectListbox, SelectOption, SelectTrigger } from '@qwik-ui/headless';

export default component$(() => {
  const mockUsers = ['Tim', 'Ryan', 'Jim'];
  const moreUsers = ['Carla', 'Rachel', 'Monica', 'Jessie', 'Abby'];

  const usersSig = useSignal<string[]>([]);

  useTask$(async () => {
    usersSig.value = mockUsers;
  });

  const handleClick$ = $(() => {
    usersSig.value = [...usersSig.value, ...moreUsers];
  });

  return (
    <div>
      <Select>
        <SelectTrigger>Trigger</SelectTrigger>
        <SelectListbox style={{ padding: '0px', margin: '0px', listStyle: 'none' }}>
          <SelectOption disabled>My option</SelectOption>
          {usersSig.value.map((user) => (
            <SelectOption key={user}>{user}</SelectOption>
          ))}
        </SelectListbox>
      </Select>
      {/* somehow this adds more js on page load? / wakes up the framework? */}
      <button onClick$={handleClick$}>Add more!</button>
    </div>
  );
});
