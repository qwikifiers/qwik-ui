import { component$, useId, useStyles$ } from '@builder.io/qwik';
import { Select } from '@qwik-ui/headless';
import styles from './select.css?inline';

export default component$(() => {
  useStyles$(styles);
  return (
    <>
      <h2>This is the documentation for the Select</h2>
      <Select.Root>
        <Select.Label class="mr-2">
          Alternate Tailwind Select implementation
        </Select.Label>
        <Select.Trigger class="select-caret inline-flex items-center justify-between w-full h-12 max-w-xs px-4 text-sm font-semibold leading-loose border rounded-lg cursor-pointer border-base-content border-opacity-20 bg-base-100 shrink-0">
          <Select.Value placeholder="Select an option! ⚡" />
        </Select.Trigger>
        <Select.ListBox class="w-full max-w-xs border border-base-content border-opacity-20 bg-base-100 rounded-[0.25rem] py-1">
          <Select.Option
            value="🚀 Qwik"
            class="px-1 leading-loose hover:bg-gray-300"
          />
          <Select.Group class="">
            <Select.Label class="block px-1 leading-loose">Fruits</Select.Label>
            {[
              { value: '🍎 Apple', disabled: false },
              { value: '🍌 Banana', disabled: false },
              { value: '🍒 Cherry', disabled: false },
              { value: '🐲 Dragonfruit', disabled: true },
            ].map((option) => {
              return (
                <Select.Option
                  key={useId()}
                  value={option.value}
                  disabled={option.disabled}
                  class="px-1 leading-loose hover:bg-gray-300"
                />
              );
            })}
          </Select.Group>
        </Select.ListBox>
      </Select.Root>
    </>
  );
});
