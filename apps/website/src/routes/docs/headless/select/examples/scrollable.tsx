import { component$, useStyles$ } from '@builder.io/qwik';
import {
  Select,
  SelectPopover,
  SelectGroup,
  SelectGroupLabel,
  SelectListbox,
  SelectOption,
  SelectTrigger,
  SelectValue,
  SelectOptionLabel,
} from '@qwik-ui/headless';
import styles from '../snippets/select.css?inline';

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
            <SelectGroupLabel class="select-label">People</SelectGroupLabel>
            {users.map((user) => (
              <SelectOption class="select-option" key={user}>
                <SelectOptionLabel>{user}</SelectOptionLabel>
              </SelectOption>
            ))}
          </SelectGroup>
          <SelectGroup>
            <SelectGroupLabel class="select-label">Animals</SelectGroupLabel>
            {animals.map((animal) => (
              <SelectOption key={animal}>
                <SelectOptionLabel>{animal}</SelectOptionLabel>
              </SelectOption>
            ))}
          </SelectGroup>
        </SelectListbox>
      </SelectPopover>
    </Select>
  );
});
