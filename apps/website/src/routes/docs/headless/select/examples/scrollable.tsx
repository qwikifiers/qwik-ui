import { component$, useStyles$ } from '@builder.io/qwik';
import {
  Select,
  SelectPopover,
  SelectGroup,
  SelectLabel,
  SelectListbox,
  SelectOption,
  SelectTrigger,
  SelectValue,
} from '@qwik-ui/headless';
import styles from './select.css?inline';

export default component$(() => {
  useStyles$(styles);
  const users = ['Tim', 'Ryan', 'Jim', 'Jessie', 'Abby'];
  const animals = ['Dog', 'Cat', 'Bird', 'Fish', 'Snake'];

  return (
    <Select class="select">
      <SelectTrigger class="select-trigger">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectPopover class="select-popover">
        <SelectListbox class="select-listbox select-max-height">
          <SelectGroup>
            <SelectLabel class="select-label">People</SelectLabel>
            {users.map((user) => (
              <SelectOption class="select-option" key={user}>
                {user}
              </SelectOption>
            ))}
          </SelectGroup>
          <SelectGroup>
            <SelectLabel class="select-label">Animals</SelectLabel>
            {animals.map((animal) => (
              <SelectOption class="select-option" key={animal}>
                {animal}
              </SelectOption>
            ))}
          </SelectGroup>
        </SelectListbox>
      </SelectPopover>
    </Select>
  );
});
