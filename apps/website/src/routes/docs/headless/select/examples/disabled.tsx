import { component$, useStyles$ } from '@builder.io/qwik';
import {
  Select,
  SelectPopover,
  SelectListbox,
  SelectOption,
  SelectTrigger,
  SelectValue,
} from '@qwik-ui/headless';
import styles from '../snippets/select.css?inline';

export default component$(() => {
  useStyles$(styles);
  const users = ['Tim', 'Ryan', 'Jim', 'Bobbie', 'Joan', 'Jessie', 'Abby'];

  return (
    <Select class="select">
      <p>This one is the disabled</p>
      <SelectTrigger class="select-trigger">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectPopover class="select-popover">
        <SelectListbox class="select-listbox">
          {users.map((user, index) => (
            <SelectOption
              key={user}
              disabled={
                index === 0 || index === 2 || index === users.length - 1 ? true : false
              }
            >
              {user}
            </SelectOption>
          ))}
        </SelectListbox>
      </SelectPopover>
    </Select>
  );
});
