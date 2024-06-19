import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Combobox } from '@qwik-ui/headless';
import { LuCheck, LuChevronDown, LuX } from '@qwikest/icons/lucide';

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

  const display = useSignal<string[]>([]);
  const selected = useSignal<string[]>([]);

  return (
    <Combobox.Root
      class="combobox-root"
      multiple
      bind:displayValue={display}
      bind:value={selected}
    >
      <Combobox.Label class="combobox-label">Personal Trainers</Combobox.Label>
      <Combobox.Hub class="combobox-multibox">
        {display.value.map((item) => (
          <span class="combobox-pill" key={item}>
            {item}
            <span
              onClick$={() => {
                selected.value = selected.value?.filter(
                  (selectedItem) => selectedItem !== item,
                );
              }}
            >
              <LuX aria-hidden="true" />
            </span>
          </span>
        ))}
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
  );
});

// internal
import styles from '../snippets/combobox.css?inline';
