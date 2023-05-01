import { Slot, component$, useId } from '@builder.io/qwik';
import {
  Root,
  Label,
  Trigger,
  Value,
  Marker,
  ListBox,
  Option,
  Group,
} from '@qwik-ui/headless';
import { PreviewCodeExample } from 'apps/website/src/components/preview-code-example/preview-code-example';

export const Example01 = component$(() => {
  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent">
        <Root>
          <Label class="text-black dark:text-white">
            Lorem ipsum dolor sit amet
          </Label>
          <Trigger class="flex justify-between items-center border-slate-200 dark:border-gray-600 border-[1px] p-4">
            <Value placeholder="Select an option! ⚡" />
            <Marker class="w-6 h-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </Marker>
          </Trigger>
          <ListBox class="bg-slate-100 dark:bg-gray-700 border-slate-200 dark:border-gray-600 border-[1px]">
            <Option value="🚀 Qwik" class="p-4" />
            <Group class="p-4">
              <Label class="p-4">Fruits</Label>
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
                    class="aria-disabled:text-red-500 aria-disabled:cursor-not-allowed hover:bg-slate-300 dark:hover:bg-gray-600 p-4"
                  />
                );
              })}
            </Group>
          </ListBox>
        </Root>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});

export const Example02 = component$(() => {
  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent">
        <Root>
          <Trigger class="flex justify-between items-center border-slate-200 dark:border-gray-600 border-[1px] p-4">
            <Value placeholder="Home" />
            <Marker class="w-6 h-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </Marker>
          </Trigger>
          <ListBox class="bg-slate-100 dark:bg-gray-700 border-slate-200 dark:border-gray-600 border-[1px]">
            <Option value="Orders" class="p-4" />
            <Option value="Settings" class="p-4" />
            <Option value="Contact us" class="p-4" />
          </ListBox>
        </Root>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});
