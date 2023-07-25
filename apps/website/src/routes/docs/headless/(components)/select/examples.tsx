import { Slot, component$ } from '@builder.io/qwik';
import {
  SelectGroup,
  SelectLabel,
  SelectListBox,
  SelectMarker,
  SelectOption,
  SelectRoot,
  SelectTrigger,
  SelectValue
} from '@qwik-ui/headless';
import { PreviewCodeExample } from '../../../_components/preview-code-example/preview-code-example';

export const Example01 = component$(() => {
  return (
    <PreviewCodeExample>
      <div q:slot="actualComponent">
        <SelectRoot>
          <SelectLabel class=" font-semibold ml-2 text-[#333333] dark:text-white">
            Qwik Fruits
          </SelectLabel>
          <SelectTrigger class="flex justify-between items-center px-8 bg-[#1f2532] border-[#7d95b3] border-[1px] rounded-md p-4 group peer">
            <SelectValue placeholder="Select a fruit! 🍹" class="text-white" />
            <SelectMarker class="w-6 h-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke-width="2"
                class="stroke-white group-aria-expanded:-rotate-180 transition-transform duration-[450ms]"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </SelectMarker>
          </SelectTrigger>
          <SelectListBox class="bg-[#1f2532] border-[#7d95b3] mt-2 border-[1px] rounded-md text-white">
            <SelectOption
              value="🚀 Qwik"
              class="p-4 hover:bg-[#496080] focus:bg-[#496080]"
            />
            <SelectGroup class="p-4">
              <SelectLabel class="p-4">Fruits</SelectLabel>
              {[
                { value: '🍎 Apple', disabled: false },
                { value: '🍌 Banana', disabled: false },
                { value: '🍒 Cherry', disabled: false },
                { value: '🐲 Dragonfruit', disabled: true }
              ].map((option) => {
                return (
                  <SelectOption
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    class="hover:bg-[#496080] focus:bg-[#496080] aria-disabled:text-red-500 aria-disabled:cursor-not-allowed rounded-sm p-4"
                  />
                );
              })}
            </SelectGroup>
          </SelectListBox>
        </SelectRoot>
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
        <SelectRoot>
          <SelectTrigger class="flex justify-between items-center bg-slate-100 dark:bg-gray-700 border-slate-200 dark:border-gray-600 border-[1px] p-4">
            <SelectValue placeholder="Home" class="text-gray-700 dark:text-white" />
            <SelectMarker class="w-6 h-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                class="stroke-gray-700 dark:stroke-white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </SelectMarker>
          </SelectTrigger>
          <SelectListBox class="bg-slate-100 dark:bg-gray-700 border-slate-200 dark:border-gray-600 border-[1px]">
            <SelectOption value="Orders" class="p-4" />
            <SelectOption value="Settings" class="p-4" />
            <SelectOption value="Contact us" class="p-4" />
          </SelectListBox>
        </SelectRoot>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExample>
  );
});
