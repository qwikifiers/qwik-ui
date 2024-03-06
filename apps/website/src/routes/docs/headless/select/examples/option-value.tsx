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
  const users = [
    { id: '0', label: 'Tim' },
    { id: '1', label: 'Ryan' },
    { id: '2', label: 'Jim' },
    { id: '3', label: 'Jessie' },
    { id: '4', label: 'Abby' },
  ];

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
        <SelectPopover class="select-popover">
          <SelectListbox class="select-listbox">
            {users.map((user) => (
              <SelectOption value={user.id} key={user.id}>
                {user.label}
              </SelectOption>
            ))}
          </SelectListbox>
        </SelectPopover>
      </Select>
      <p>The selected value is: {selected.value ?? 'null'}</p>
    </>
  );
});
