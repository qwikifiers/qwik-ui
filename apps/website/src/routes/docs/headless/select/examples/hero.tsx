import { component$, useStyles$ } from '@builder.io/qwik';
import {
  Select,
  SelectLabel,
  SelectListbox,
  SelectOption,
  SelectPopover,
  SelectTrigger,
  SelectValue,
  SelectOptionLabel,
} from '@qwik-ui/headless';
import styles from '../snippets/select.css?inline';

export default component$(() => {
  useStyles$(styles);
  const users = ['Tim', 'Ryan', 'Jim', 'Jessie', 'Abby'];

  return (
    <Select class="select">
      <SelectLabel>Logged in users</SelectLabel>
      <SelectTrigger class="select-trigger">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectPopover class="select-popover">
        <SelectListbox class="select-listbox">
          {users.map((user) => (
            <SelectOption key={user}>
              <SelectOptionLabel>{user}</SelectOptionLabel>
            </SelectOption>
          ))}
        </SelectListbox>
      </SelectPopover>
    </Select>
  );
});
