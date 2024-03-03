import { component$, useSignal, $, useStyles$ } from '@builder.io/qwik';
import styles from './select.css?inline';
import {
  Select,
  SelectListbox,
  SelectOption,
  SelectTrigger,
  SelectValue,
} from '@qwik-ui/headless';
export default component$(() => {
  useStyles$(styles);
  const usersSig = ['Tim', 'Ryan', 'Jim', 'Jessie', 'Abby'];
  const selected = useSignal<string>('Ryan');

  return (
    <>
      <Select
        onChange$={$((value: string) => {
          selected.value = value;
        })}
        bind:value={selected}
        class="select"
      >
        <SelectTrigger class="select-trigger">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectListbox class="select-listbox">
          {usersSig.map((user) => (
            <SelectOption class="select-option" key={user}>
              {user}
            </SelectOption>
          ))}
        </SelectListbox>
      </Select>
      <p>Your favorite user is: {selected.value}</p>
    </>
  );
});
