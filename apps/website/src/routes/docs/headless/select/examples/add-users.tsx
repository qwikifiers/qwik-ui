import { $, component$, useSignal, useStyles$ } from '@builder.io/qwik';
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
  const usersSig = useSignal<string[]>(['Tim', 'Ryan', 'Jim', 'Jessie', 'Abby']);
  const hasAddedUsersSig = useSignal<boolean>(false);

  return (
    <>
      <Select class="select">
        <SelectTrigger class="select-trigger">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectPopover class="select-popover">
          <SelectListbox class="select-listbox">
            {usersSig.value.map((user) => (
              <SelectOption class="select-option" key={user}>
                {user}
              </SelectOption>
            ))}
          </SelectListbox>
        </SelectPopover>
      </Select>
      <button
        onClick$={$(() => {
          if (!hasAddedUsersSig.value) {
            usersSig.value = [...usersSig.value, 'John', 'Jane', 'Bob'];
            hasAddedUsersSig.value = true;
          }
        })}
      >
        Add Users
      </button>
    </>
  );
});
