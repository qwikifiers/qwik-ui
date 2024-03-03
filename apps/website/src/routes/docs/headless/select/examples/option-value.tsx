import { $, component$, useSignal, useStyles$ } from '@builder.io/qwik';
import {
  Select,
  SelectListbox,
  SelectOption,
  SelectTrigger,
  SelectValue,
} from '@qwik-ui/headless';
import styles from './select.css?inline';
export default component$(() => {
  useStyles$(styles);
  const users = ['Tim', 'Ryan', 'Jim', 'Jessie', 'Abby'];
  const selected = useSignal<string | null>(null);

  const handleChange$ = $((value: string) => {
    selected.value = value;
  });

  return (
    <>
      <Select onChange$={handleChange$} class="select">
        <SelectTrigger class="select-trigger">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectListbox class="select-listbox">
          {users.map((user, index) => (
            <SelectOption value={index.toString()} class="select-option" key={user}>
              {user}
            </SelectOption>
          ))}
        </SelectListbox>
      </Select>
      <p>The selected value is: {selected.value ?? 'null'}</p>
    </>
  );
});
