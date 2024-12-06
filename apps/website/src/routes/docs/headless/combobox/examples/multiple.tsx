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

  const displayValues = useSignal<string[]>([]);
  const selected = useSignal<string[]>([]);

  const inputRef = useSignal<HTMLInputElement>();

  return (
    <Combobox.Root
      class="combobox-root"
      multiple
      removeOnBackspace
      bind:displayValue={displayValues}
      bind:value={selected}
    >
      <Combobox.Label class="combobox-label">Personal Trainers</Combobox.Label>
      <Combobox.Control class="combobox-control combobox-multiple">
        <div class="combobox-pill-container">
          {displayValues.value.map((item) => (
            <span class="combobox-pill" key={item}>
              {item}
              <span
                onPointerDown$={() => {
                  selected.value = selected.value?.filter(
                    (selectedItem) => selectedItem !== item,
                  );
                  inputRef.value?.focus();
                }}
              >
                <LuX aria-hidden="true" />
              </span>
            </span>
          ))}
          {displayValues.value.length > 4 && (
            <button
              class="combobox-clear combobox-pill"
              onClick$={() => {
                selected.value = [];
                inputRef.value?.focus();
              }}
            >
              clear all
            </button>
          )}
        </div>
        <Combobox.Input class="combobox-input" ref={inputRef} />
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
  );
});

// internal
import styles from '../snippets/combobox.css?inline';
