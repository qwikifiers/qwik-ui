import { Combobox, type ResolvedOption } from '@qwik-ui/headless';
import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { LuCheck, LuChevronDown } from '@qwikest/icons/lucide';

export default component$(() => {
  useStyles$(styles);
  const selectedOptionIndexSig = useSignal<number>(-1);

  const objectExample = [
    { value: 'alice', label: 'Alice' },
    { value: 'joana', label: 'Joana' },
    { value: 'malcolm', label: 'Malcolm' },
    { value: 'zack', label: 'Zack' },
    { value: 'brian', label: 'Brian' },
    { value: 'ryan', label: 'Ryan' },
    { value: 'joe', label: 'Joe' },
    { value: 'randy', label: 'Randy' },
    { value: 'david', label: 'David' },
    { value: 'joseph', label: 'Joseph' },
  ];

  type MyData = {
    value: string;
    label: string;
    disabled: boolean;
  };

  return (
    <Combobox.Root
      options={objectExample}
      bind:selectedIndex={selectedOptionIndexSig}
      class="combobox-root"
    >
      <Combobox.Label class="combobox-label">Personal Trainers ⚡</Combobox.Label>
      <Combobox.Control class="combobox-control">
        <Combobox.Input placeholder="Jim" class="combobox-input" />
        <Combobox.Trigger class="combobox-trigger">
          <LuChevronDown class="combobox-icon" />
        </Combobox.Trigger>
      </Combobox.Control>
      <Combobox.Popover class="combobox-popover" gutter={8}>
        <Combobox.Listbox
          class="combobox-listbox"
          optionRenderer$={(option: ResolvedOption, index: number) => {
            const myData = option.option as MyData;
            return (
              <Combobox.Option
                class="combobox-option"
                key={option.key}
                resolved={option}
                index={index}
              >
                <span>{myData.label}</span>
                {selectedOptionIndexSig.value === index && <LuCheck />}
              </Combobox.Option>
            );
          }}
        />
      </Combobox.Popover>
    </Combobox.Root>
  );
});

// internal
import styles from '../snippets/combobox.css?inline';
