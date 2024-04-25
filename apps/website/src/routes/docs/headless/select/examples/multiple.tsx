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
  const selected = useSignal<string[]>([]);

  return (
    <Select multiple bind:value={selected} class="select">
      <SelectTrigger class="select-trigger">
        <SelectValue>{selected.value}</SelectValue>
      </SelectTrigger>
      <SelectPopover class="select-popover">
        <SelectListbox class="select-listbox">
          {users.map((user) => (
            <SelectOption key={user}>{user}</SelectOption>
          ))}
        </SelectListbox>
      </SelectPopover>
    </Select>
  );
});
