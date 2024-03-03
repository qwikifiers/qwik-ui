import { component$, useStyles$ } from '@builder.io/qwik';
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

  return (
    <>
      <Select value="Jessi" class="select">
        <SelectTrigger class="select-trigger">
          <SelectValue placeholder="wrong value placeholder" />
        </SelectTrigger>
        <SelectListbox class="select-listbox">
          {users.map((user) => (
            <SelectOption class="select-option" key={user}>
              {user}
            </SelectOption>
          ))}
        </SelectListbox>
      </Select>
    </>
  );
});
