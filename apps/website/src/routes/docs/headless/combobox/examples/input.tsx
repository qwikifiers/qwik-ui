import { component$, useSignal, useStyles$, $ } from '@builder.io/qwik';
import { Combobox } from '@qwik-ui/headless';
import { LuCheck, LuChevronDown } from '@qwikest/icons/lucide';

export default component$(() => {
  useStyles$(styles);
  const count = useSignal(0);
  const inputValue = useSignal('');

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

  const handleInput$ = $((value: string) => {
    count.value++;
    inputValue.value = value;
  });

  return (
    <>
      <Combobox.Root class="combobox-root" onInput$={handleInput$}>
        <div>onInput$ value: {inputValue.value}</div>
        <Combobox.Label class="combobox-label">Personal Trainers</Combobox.Label>

        <Combobox.Control class="combobox-control">
          <Combobox.Input class="combobox-input" />
          <Combobox.Trigger class="combobox-trigger">
            <LuChevronDown class="combobox-icon" />
          </Combobox.Trigger>
        </Combobox.Control>

        <Combobox.Popover class="combobox-popover" gutter={8}>
          {fruits.map((fruit) => (
            <Combobox.Item key={fruit} class="combobox-item">
              <Combobox.ItemLabel>{fruit}</Combobox.ItemLabel>
              <Combobox.ItemIndicator>
                <LuCheck />
              </Combobox.ItemIndicator>
            </Combobox.Item>
          ))}
        </Combobox.Popover>
      </Combobox.Root>
      <p>onInput$ was called {count.value} time(s)</p>
    </>
  );
});

// internal
import styles from '../snippets/combobox.css?inline';
