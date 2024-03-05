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
        <SelectPopover class="select-popover">
          <SelectListbox class="select-listbox">
            {users.map((user) => (
              <SelectOption class="select-option" key={user}>
                {user}
              </SelectOption>
            ))}
          </SelectListbox>
        </SelectPopover>
      </Select>
      <p>The listbox opened and closed {changeCount.value} time(s)</p>
    </>
  );
});
