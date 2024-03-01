import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import styles from './select.css?inline';
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
  useStyles$(styles);
  const usersSig = useSignal<string[]>(['Tim', 'Ryan', 'Jim', 'Abby']);
  const animalsSig = useSignal<string[]>(['Dog', 'Cat', 'Bird']);

  return (
    <Select class="select">
      <SelectTrigger class="select-trigger">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectListbox class="select-listbox">
        <SelectGroup>
          <SelectLabel class="select-label">People</SelectLabel>
          {usersSig.value.map((user) => (
            <SelectOption class="select-option" key={user}>
              {user}
            </SelectOption>
          ))}
        </SelectGroup>
        <SelectGroup>
          <SelectLabel class="select-label">Animals</SelectLabel>
          {animalsSig.value.map((animal) => (
            <SelectOption class="select-option" key={animal}>
              {animal}
            </SelectOption>
          ))}
        </SelectGroup>
      </SelectListbox>
    </Select>
  );
});
