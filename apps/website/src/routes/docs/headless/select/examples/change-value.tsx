import { $, component$, useSignal, useStyles$ } from '@builder.io/qwik';
import {
  Select,
  SelectPopover,
  SelectListbox,
  SelectOption,
  SelectTrigger,
  SelectValue,
  SelectOptionLabel,
} from '@qwik-ui/headless';
import styles from '../snippets/select.css?inline';
export default component$(() => {
  useStyles$(styles);
  const users = ['Tim', 'Ryan', 'Jim', 'Jessie', 'Abby'];
  const counter = useSignal(0);

  const handleChange$ = $((): void => {
    counter.value++;
  });

  return (
    <>
      <Select onChange$={handleChange$} class="select">
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
      <p>You have changed {counter.value} times</p>
    </>
  );
});
