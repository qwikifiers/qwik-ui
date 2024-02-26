import { component$, useSignal } from '@builder.io/qwik';
import {
  Select,
  SelectListbox,
  SelectOption,
  SelectTrigger,
  SelectValue,
} from '@qwik-ui/headless';

export default component$(() => {
  const usersSig = useSignal<string[]>(['Tim', 'Ryan', 'Jim', 'Jessie', 'Abby']);

  return (
    <Select class="relative min-w-40">
      <SelectTrigger class="w-full border-2 border-dashed border-red-400">
        <SelectValue />
      </SelectTrigger>
      <SelectListbox class="absolute w-full border-2 border-dashed border-green-400 bg-slate-900 p-2">
        {usersSig.value.map((user) => (
          <SelectOption
            class="border-dashed border-blue-400 data-[highlighted]:border-2"
            key={user}
          >
            {user}
          </SelectOption>
        ))}
      </SelectListbox>
    </Select>
  );
});
