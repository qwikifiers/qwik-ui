import { component$, useSignal } from '@builder.io/qwik';
import { Select, SelectListbox, SelectOption, SelectTrigger } from '@qwik-ui/headless';

export default component$(() => {
  const usersSig = useSignal<string[]>(['Tim', 'Ryan', 'Jim', 'Jessie', 'Abby']);

  return (
    <Select>
      <SelectTrigger>Trigger</SelectTrigger>
      <SelectListbox
        class="hidden"
        style={{ padding: '0px', margin: '0px', listStyle: 'none' }}
      >
        {usersSig.value.map((user) => (
          <SelectOption key={user}>{user}</SelectOption>
        ))}
      </SelectListbox>
    </Select>
  );
});
