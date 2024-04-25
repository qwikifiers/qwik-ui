import { $, component$, useSignal, useStyles$ } from '@builder.io/qwik';
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
  const users = ['Tim', 'Ryan', 'Jim', 'Jessie', 'Abby'];
  const selected = useSignal<string>('Ryan');

  return (
    <>
      <Select bind:value={selected} class="select">
        <SelectTrigger class="select-trigger">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectPopover class="select-popover">
          <SelectListbox class="select-listbox">
            {users.map((user, index) => (
              <SelectOption value={index.toString()} key={user}>
                {user}
              </SelectOption>
            ))}
          </SelectListbox>
        </SelectPopover>
      </Select>
      <button onClick$={$(() => (selected.value = '4'))}>Change to Abby</button>
    </>
  );
});
