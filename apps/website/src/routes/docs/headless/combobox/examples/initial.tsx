import { component$, useStyles$ } from '@builder.io/qwik';
import { Combobox } from '@qwik-ui/headless';
import { LuCheck, LuChevronDown } from '@qwikest/icons/lucide';

export default component$(() => {
  useStyles$(styles);

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

  return (
    <Combobox.Root class="combobox-root" value="Blackberry">
      <Combobox.Label class="combobox-label">Personal Trainers</Combobox.Label>
      <div class="combobox-box">
        <Combobox.Input class="combobox-input" />
        <Combobox.Trigger class="combobox-trigger">
          <LuChevronDown class="combobox-icon" />
        </Combobox.Trigger>
      </div>
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
  );
});

// internal
import styles from '../snippets/combobox.css?inline';