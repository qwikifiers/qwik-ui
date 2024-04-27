import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import {
  Select,
  SelectListbox,
  SelectOption,
  SelectOptionLabel,
  SelectPopover,
  SelectTrigger,
  SelectValue,
} from '@qwik-ui/headless';
import styles from '../snippets/select.css?inline';

export default component$(() => {
  useStyles$(styles);
  const users = ['Tim', 'Ryan', 'Jim', 'Jessie', 'Abby'];
  const isOpen = useSignal(false);

  return (
    <>
      <button onClick$={() => (isOpen.value = true)}>Toggle open state</button>
      <Select bind:open={isOpen} class="select">
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
    </>
  );
});
