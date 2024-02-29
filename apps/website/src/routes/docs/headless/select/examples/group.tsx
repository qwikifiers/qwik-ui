import { component$, useSignal } from '@builder.io/qwik';
import {
  Select,
  SelectListbox,
  SelectOption,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from '@qwik-ui/headless';

export default component$(() => {
  const usersSig = useSignal<string[]>(['Tim', 'Ryan', 'Jim', 'Abby']);
  const animalsSig = useSignal<string[]>(['Dog', 'Cat', 'Bird']);

  return (
    <Select class="relative min-w-40">
      <SelectTrigger class="w-full border-2 border-dashed border-red-400">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectListbox class="absolute z-10 w-full border-2 border-dashed border-green-400 bg-slate-900 p-2">
        <SelectGroup>
          <SelectLabel class="text-sm text-slate-400">People</SelectLabel>
          {usersSig.value.map((user) => (
            <SelectOption
              class="border-dashed border-blue-400 data-[highlighted]:border-2"
              key={user}
            >
              {user}
            </SelectOption>
          ))}
        </SelectGroup>
        <SelectGroup>
          <SelectLabel class="text-sm text-slate-400">Animals</SelectLabel>
          {animalsSig.value.map((animal) => (
            <SelectOption
              class="border-dashed border-blue-400 data-[highlighted]:border-2"
              key={animal}
            >
              {animal}
            </SelectOption>
          ))}
        </SelectGroup>
      </SelectListbox>
    </Select>
  );
});
