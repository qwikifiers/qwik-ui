import { component$, useStyles$ } from '@builder.io/qwik';
import {
  Select,
  SelectPopover,
  SelectListbox,
  SelectOption,
  SelectTrigger,
  SelectValue,
} from '@qwik-ui/headless';
import styles from './select.css?inline';

export default component$(() => {
  useStyles$(styles);
  const users = [
    { name: 'Tim', status: '🟢' },
    { name: 'Ryan', status: '🔴' },
    { name: 'Jim', status: '🟡' },
    { name: 'Jessie', status: '🟢' },
    { name: 'Abby', status: '🟡' },
  ];

  return (
    <Select class="select">
      <SelectTrigger class="select-trigger">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectPopover class="select-popover">
        <SelectListbox class="select-listbox">
          {users.map((user) => {
            return (
              <SelectOption key={user.name}>{`${user.status} ${user.name}`}</SelectOption>
            );
          })}
        </SelectListbox>
      </SelectPopover>
    </Select>
  );
});
