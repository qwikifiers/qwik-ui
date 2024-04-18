import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
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
  const users = ['Tim', 'Ryan', 'Jim', 'Jessie', 'Abby'];
  const isOpen = useSignal(false);

  return (
    <>
      <button onClick$={() => (isOpen.value = true)}>Toggle open state</button>
      <Select bind:open={isOpen} class="select" aria-label="hero">
        <SelectTrigger class="select-trigger">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectPopover class="select-popover">
          <SelectListbox class="select-listbox">
            {users.map((user) => (
              <SelectOption key={user}>{user}</SelectOption>
            ))}
          </SelectListbox>
        </SelectPopover>
      </Select>
    </>
  );
});
