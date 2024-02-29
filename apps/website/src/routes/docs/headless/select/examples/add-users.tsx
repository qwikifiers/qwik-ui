import { component$, useSignal, $ } from '@builder.io/qwik';
import {
  Select,
  SelectListbox,
  SelectOption,
  SelectTrigger,
  SelectValue,
} from '@qwik-ui/headless';

export default component$(() => {
  const usersSig = useSignal<string[]>(['Tim', 'Ryan', 'Jim', 'Jessie', 'Abby']);
  const hasAddedUsersSig = useSignal<boolean>(false);

  return (
    <>
      <Select class="relative mb-2 min-w-40">
        <SelectTrigger class="w-full border-2 border-dashed border-red-400">
          <SelectValue placeholder="Select an option" />
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
      <button
        class="bg-background border-2 border-dashed border-red-400"
        onClick$={$(() => {
          if (!hasAddedUsersSig.value) {
            usersSig.value = [...usersSig.value, 'John', 'Jane', 'Bob'];
            hasAddedUsersSig.value = true;
          }
        })}
      >
        Add Users
      </button>
    </>
  );
});
