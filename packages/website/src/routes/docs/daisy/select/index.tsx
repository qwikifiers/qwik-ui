import { component$, useId, useStyles$ } from '@builder.io/qwik';
import { AltSelect } from '@qwik-ui/headless';
import styles from './select.css?inline';

export default component$(() => {
  useStyles$(styles);
  return (
    <>
      <h2>This is the documentation for the Select</h2>
      <AltSelect.Root>
        <AltSelect.Label class="mr-2">
          Alternate Daisy Select implementation
        </AltSelect.Label>
        <AltSelect.Trigger class="select-caret inline-flex items-center justify-between w-full h-12 max-w-xs px-4 text-sm font-semibold leading-loose border rounded-lg cursor-pointer border-base-content border-opacity-20 bg-base-100 shrink-0">
          <AltSelect.Value placeholder="Select an option! ⚡" />
        </AltSelect.Trigger>
        <AltSelect.ListBox class="w-full max-w-xs border border-base-content border-opacity-20 bg-base-100 rounded-[0.25rem] py-1">
          <AltSelect.Option
            value="🚀 Qwik"
            class="px-1 leading-loose hover:bg-gray-300"
          />
          <AltSelect.Group class="">
            <AltSelect.Label class="block px-1 leading-loose">
              Fruits
            </AltSelect.Label>
            {[
              { value: '🍎 Apple', disabled: false },
              { value: '🍌 Banana', disabled: false },
              { value: '🍒 Cherry', disabled: false },
              { value: '🐲 Dragonfruit', disabled: true },
            ].map((option) => {
              return (
                <AltSelect.Option
                  key={useId()}
                  value={option.value}
                  disabled={option.disabled}
                  class="px-1 leading-loose hover:bg-gray-300"
                />
              );
            })}
          </AltSelect.Group>
        </AltSelect.ListBox>
      </AltSelect.Root>
    </>
  );
});
