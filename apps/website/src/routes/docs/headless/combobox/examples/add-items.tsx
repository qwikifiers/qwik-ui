import { $, component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Combobox } from '@qwik-ui/headless';
import { LuChevronDown, LuCheck } from '@qwikest/icons/lucide';

export default component$(() => {
  useStyles$(styles);
  const fruits = useSignal<string[]>([
    'Apple',
    'Apricot',
    'Bilberry',
    'Blackberry',
    'Blackcurrant',
    'Currant',
    'Cherry',
    'Coconut',
  ]);
  const hasAddedFruits = useSignal<boolean>(false);

  return (
    <>
      <Combobox.Root class="combobox-root">
        <Combobox.Label class="combobox-label">Fruits</Combobox.Label>
        <Combobox.Control class="combobox-control">
          <Combobox.Input class="combobox-input" />
          <Combobox.Trigger class="combobox-trigger">
            <LuChevronDown class="combobox-icon" />
          </Combobox.Trigger>
        </Combobox.Control>
        <Combobox.Popover class="combobox-popover" gutter={8}>
          {fruits.value.map((fruit) => (
            <Combobox.Item key={fruit} class="combobox-item">
              <Combobox.ItemLabel>{fruit}</Combobox.ItemLabel>
              <Combobox.ItemIndicator>
                <LuCheck />
              </Combobox.ItemIndicator>
            </Combobox.Item>
          ))}
        </Combobox.Popover>
      </Combobox.Root>
      <button
        onClick$={$(() => {
          if (!hasAddedFruits.value) {
            fruits.value = [...fruits.value, 'Durian', 'Jackfruit', 'Ackee'];
            hasAddedFruits.value = true;
          }
        })}
      >
        Add Fruits
      </button>
    </>
  );
});

// internal
import styles from '../snippets/combobox.css?inline';
