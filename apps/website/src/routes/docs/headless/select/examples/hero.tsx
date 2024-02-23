import { component$, useSignal } from '@builder.io/qwik';
import { Select, SelectListbox, SelectOption, SelectTrigger } from '@qwik-ui/headless';

export default component$(() => {
  const usersSig = useSignal<string[]>(['Tim', 'Ryan', 'Jim', 'Jessie', 'Abby']);

  return (
    <Select>
      <SelectTrigger class="min-w-40 bg-slate-700 py-2" />
      <SelectListbox class="absolute min-w-40 bg-slate-800 px-3 py-2">
        {usersSig.value.map((user) => (
          <SelectOption key={user}>{user}</SelectOption>
        ))}
      </SelectListbox>
    </Select>
  );
});
