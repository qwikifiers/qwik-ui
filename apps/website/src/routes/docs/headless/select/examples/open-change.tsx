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
  const changeCount = useSignal(0);
  const isOpen = useSignal(false);

  const handleOpenChange$ = $((open: boolean): void => {
    isOpen.value = open;
    changeCount.value++;
  });

  return (
    <>
      <span>It is currently: {isOpen.value ? 'open' : 'closed'}</span>
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
      <p>The listbox opened and closed {changeCount.value} time(s)</p>
    </>
  );
});
