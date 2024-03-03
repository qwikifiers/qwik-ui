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
  const openChangeSig = useSignal(0);

  const handleOpenChange$ = $((): void => {
    openChangeSig.value++;
  });

  return (
    <>
      <Select onOpenChange$={handleOpenChange$} class="select">
        <SelectTrigger class="select-trigger">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectListbox class="select-listbox">
          {users.map((user) => (
            <SelectOption class="select-option" key={user}>
              {user}
            </SelectOption>
          ))}
        </SelectListbox>
      </Select>
      <p>The listbox opened and closed {openChangeSig.value} time(s)</p>
    </>
  );
});
