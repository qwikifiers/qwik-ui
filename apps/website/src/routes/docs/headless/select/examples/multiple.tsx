import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import {
  Select,
  SelectIndicator,
  SelectListbox,
  SelectOption,
  SelectOptionLabel,
  SelectPopover,
  SelectTrigger,
  SelectValue,
} from '@qwik-ui/headless';
import styles from '../snippets/select.css?inline';
import { LuCheck } from '@qwikest/icons/lucide';

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
            <SelectOption class="select-option" key={user}>
              <SelectOptionLabel>{user}</SelectOptionLabel>
              <SelectIndicator>
                <LuCheck />
              </SelectIndicator>
            </SelectOption>
          ))}
        </SelectListbox>
      </SelectPopover>
    </Select>
  );
});
