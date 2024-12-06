import { component$, useSignal, useStyles$, useTask$ } from '@builder.io/qwik';
import { Combobox } from '@qwik-ui/headless';
import { LuCheck, LuChevronDown } from '@qwikest/icons/lucide';
import { matchSorter } from 'match-sorter';

export default component$(() => {
  useStyles$(styles);

  const inputValue = useSignal('');
  const filteredItems = useSignal<string[]>([]);

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

  useTask$(({ track }) => {
    track(() => inputValue.value);

    filteredItems.value = matchSorter(fruits, inputValue.value);
  });

  return (
    <Combobox.Root class="combobox-root" filter={false}>
      <Combobox.Label class="combobox-label">Personal Trainers</Combobox.Label>
      <Combobox.Control class="combobox-control">
        <Combobox.Input bind:value={inputValue} class="combobox-input" />
        <Combobox.Trigger class="combobox-trigger">
          <LuChevronDown class="combobox-icon" />
        </Combobox.Trigger>
      </Combobox.Control>
      <Combobox.Popover class="combobox-popover" gutter={8}>
        {filteredItems.value.map((fruit) => (
          <Combobox.Item key={fruit} class="combobox-item">
            <Combobox.ItemLabel>{fruit}</Combobox.ItemLabel>
            <Combobox.ItemIndicator>
              <LuCheck />
            </Combobox.ItemIndicator>
          </Combobox.Item>
        ))}
      </Combobox.Popover>
    </Combobox.Root>
  );
});

// internal
import styles from '../snippets/combobox.css?inline';
