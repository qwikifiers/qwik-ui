import { $, component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Combobox } from '@qwik-ui/headless';
export default component$(() => {
  useStyles$(styles);
  const users = [
    { id: '0', name: 'Tim' },
    { id: '1', name: 'Ryan' }, // 👈 start with Ryan
    { id: '2', name: 'Jim' },
    { id: '3', name: 'Jessie' },
    { id: '4', name: 'Abby' },
  ];
  const selectedId = useSignal<string>('1');

  return (
    <>
      <Combobox.Root class="combobox-root" bind:value={selectedId}>
        <Combobox.Label class="combobox-label">Personal Trainers</Combobox.Label>
        <Combobox.Control class="combobox-control">
          <Combobox.Input class="combobox-input" />
          <Combobox.Trigger class="combobox-trigger">
            <LuChevronDown class="combobox-icon" />
          </Combobox.Trigger>
        </Combobox.Control>
        <Combobox.Popover class="combobox-popover" gutter={8}>
          {users.map((user) => (
            <Combobox.Item value={user.id} key={user.id} class="combobox-item">
              <Combobox.ItemLabel>{user.name}</Combobox.ItemLabel>
              <Combobox.ItemIndicator>
                <LuCheck />
              </Combobox.ItemIndicator>
            </Combobox.Item>
          ))}
        </Combobox.Popover>
      </Combobox.Root>
      <button onClick$={$(() => (selectedId.value = '4'))}>Change to Abby</button>
    </>
  );
});

// internal
import styles from '../snippets/combobox.css?inline';
import { LuChevronDown, LuCheck } from '@qwikest/icons/lucide';
