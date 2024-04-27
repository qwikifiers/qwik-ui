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
  const selected = useSignal<string[]>([]);

  return (
    <Select multiple bind:value={selected} class="select">
      <SelectTrigger class="select-trigger">
        <SelectValue>{selected.value.join(', ')}</SelectValue>
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
