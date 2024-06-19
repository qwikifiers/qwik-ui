import { $, component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Combobox } from '@qwik-ui/headless';

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
      <Combobox.Root onChange$={handleChange$} class="combobox-root" value="Blackberry">
        <Combobox.Label class="combobox-label">Personal Trainers</Combobox.Label>
        <div class="combobox-box">
          <Combobox.Input class="combobox-input" />
          <Combobox.Trigger class="combobox-trigger">
            <LuChevronDown class="combobox-icon" />
          </Combobox.Trigger>
        </div>
        <Combobox.Popover class="combobox-popover" gutter={8}>
          <Combobox.Listbox class="combobox-listbox">
            {users.map((user) => (
              <Combobox.Item value={user.id} key={user.id} class="combobox-item">
                <Combobox.ItemLabel>{user.label}</Combobox.ItemLabel>
                <Combobox.ItemIndicator>
                  <LuCheck />
                </Combobox.ItemIndicator>
              </Combobox.Item>
            ))}
          </Combobox.Listbox>
        </Combobox.Popover>
      </Combobox.Root>
      <p>The selected value is: {selected.value ?? 'null'}</p>
    </>
  );
});

// internal
import styles from '../snippets/combobox.css?inline';
import { LuCheck, LuChevronDown } from '@qwikest/icons/lucide';
