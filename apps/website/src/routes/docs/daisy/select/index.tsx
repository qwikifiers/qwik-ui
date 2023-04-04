import { component$, useId, useStyles$ } from '@builder.io/qwik';
import {
  Root,
  Trigger,
  Value,
  ListBox,
  Group,
  Label,
  Option,
} from '@qwik-ui/headless';
import styles from './select.css?inline';

export default component$(() => {
  useStyles$(styles);
  return (
    <>
      <h2>This is the documentation for the Select</h2>
      <Root>
        <Label class="mr-2">Alternate Daisy Select implementation</Label>
        <Trigger class="relative select-caret inline-flex border rounded-lg cursor-pointer border-base-content border-opacity-20 items-center w-full h-12 max-w-xs px-4 text-sm font-semibold leading-loose  shrink-0">
          <Value placeholder="Select an option! ⚡" />
          <ListBox class="w-full max-w-xs border border-base-content border-opacity-20 bg-base-100 rounded-[0.25rem] py-1 text-left pl-1">
            <Option
              value="🚀 Qwik"
              class="px-1 leading-loose hover:bg-gray-300"
            />
            <Group>
              <Label class="px-1 leading-loose">Fruits</Label>
              {[
                { value: '🍎 Apple', disabled: false },
                { value: '🍌 Banana', disabled: false },
                { value: '🍒 Cherry', disabled: false },
                { value: '🐲 Dragonfruit', disabled: true },
              ].map((option) => {
                return (
                  <Option
                    key={useId()}
                    value={option.value}
                    disabled={option.disabled}
                    class="px-1 leading-loose hover:bg-gray-300"
                  />
                );
              })}
            </Group>
          </ListBox>
        </Trigger>
      </Root>
    </>
  );
});
