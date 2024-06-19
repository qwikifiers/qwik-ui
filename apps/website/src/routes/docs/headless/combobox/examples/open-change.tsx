import { component$, useSignal, useStyles$, $ } from '@builder.io/qwik';
import { Combobox } from '@qwik-ui/headless';
import { LuCheck, LuChevronDown } from '@qwikest/icons/lucide';

export default component$(() => {
  useStyles$(styles);
  const count = useSignal(0);

  const fruits = [
    'Apple',
    'Apricot',
    'Bilberry',
    'Blackberry',
    'Blackcurrant',
    'Currant',
    'Cherry',
    'Coconut',
  ];

  const handleOpenChange$ = $(() => {
    count.value++;
  });

  return (
    <>
      <Combobox.Root class="combobox-root" onOpenChange$={handleOpenChange$}>
        <Combobox.Label class="combobox-label">Personal Trainers</Combobox.Label>
        <Combobox.Hub class="combobox-hub">
          <Combobox.Input class="combobox-input" />
          <Combobox.Trigger class="combobox-trigger">
            <LuChevronDown class="combobox-icon" />
          </Combobox.Trigger>
        </Combobox.Hub>
        <Combobox.Popover class="combobox-popover" gutter={8}>
          <Combobox.Listbox class="combobox-listbox">
            {fruits.map((fruit) => (
              <Combobox.Item key={fruit} class="combobox-item">
                <Combobox.ItemLabel>{fruit}</Combobox.ItemLabel>
                <Combobox.ItemIndicator>
                  <LuCheck />
                </Combobox.ItemIndicator>
              </Combobox.Item>
            ))}
          </Combobox.Listbox>
        </Combobox.Popover>
      </Combobox.Root>
      <p>The listbox opened and closed {count.value} time(s)</p>
    </>
  );
});

// internal
import styles from '../snippets/combobox.css?inline';
