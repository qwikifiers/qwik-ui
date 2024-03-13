import { $, component$, useSignal, useStyles$ } from '@builder.io/qwik';
import {
  Select,
  SelectListbox,
  SelectOption,
  SelectPopover,
  SelectTrigger,
  SelectValue,
} from '@qwik-ui/headless';
import styles from '../snippets/select.css?inline';

export default component$(() => {
  useStyles$(styles);
  const users = useSignal<string[]>(['Tim', 'Ryan', 'Jim', 'Jessie', 'Abby']);
  const hasAddedUsers = useSignal<boolean>(false);

  return (
    <>
      <Select class="select">
        <SelectTrigger class="select-trigger">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectPopover class="select-popover">
          <SelectListbox class="select-listbox">
            {users.value.map((user) => (
              <SelectOption key={user}>{user}</SelectOption>
            ))}
          </SelectListbox>
        </SelectPopover>
      </Select>
      <button
        onClick$={$(() => {
          if (!hasAddedUsers.value) {
            users.value = [...users.value, 'John', 'Jane', 'Bob'];
            hasAddedUsers.value = true;
          }
        })}
      >
        Add Users
      </button>
    </>
  );
});
