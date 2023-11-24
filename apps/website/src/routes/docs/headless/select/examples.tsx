import { Slot, component$ } from '@builder.io/qwik';
import {
  SelectGroup,
  SelectLabel,
  SelectListBox,
  SelectMarker,
  SelectOption,
  SelectRoot,
  SelectTrigger,
  SelectValue,
} from '@qwik-ui/headless';
import { PreviewCodeExampleTabsDeprecated } from '~/components/preview-code-example/preview-code-example-tabs-deprecated';

export const Example01 = component$(() => {
  return (
    <PreviewCodeExampleTabsDeprecated>
      <div q:slot="actualComponent">
        <SelectRoot>
          <SelectLabel class="ml-2 font-semibold text-white">Qwik Fruits</SelectLabel>
          <SelectTrigger class="group peer flex items-center justify-between rounded-md border-[1px] border-slate-600 bg-slate-800 p-4 px-8">
            <SelectValue placeholder="Select a fruit! 🍹" class="text-white" />
            <SelectMarker class="h-6 w-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke-width="2"
                class="stroke-white transition-transform duration-[450ms] group-aria-expanded:-rotate-180"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </SelectMarker>
          </SelectTrigger>
          <SelectListBox class="mt-2 rounded-md border-[1px] border-slate-600 bg-slate-800 text-white">
            <SelectOption
              optionValue="🚀 Qwik"
              class="p-4 hover:bg-slate-700 focus:bg-slate-700"
            >
              🚀 Qwik
            </SelectOption>
            <SelectGroup class="p-4">
              <SelectLabel class="p-4">Fruits</SelectLabel>
              {[
                { value: '🍎 Apple', disabled: false },
                { value: '🍌 Banana', disabled: false },
                { value: '🍒 Cherry', disabled: false },
                { value: '🐲 Dragonfruit', disabled: true },
              ].map((option) => {
                return (
                  <SelectOption
                    key={option.value}
                    optionValue={option.value}
                    disabled={option.disabled}
                    class="rounded-sm p-4 hover:bg-slate-700 focus:bg-slate-700 aria-disabled:cursor-not-allowed aria-disabled:text-red-500"
                  >
                    {option.value}
                  </SelectOption>
                );
              })}
            </SelectGroup>
          </SelectListBox>
        </SelectRoot>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExampleTabsDeprecated>
  );
});

export const Example02 = component$(() => {
  return (
    <PreviewCodeExampleTabsDeprecated>
      <div q:slot="actualComponent">
        <SelectRoot>
          <SelectTrigger class="group peer flex items-center justify-between rounded-md border-[1px] border-slate-600 bg-slate-800 p-4 px-8">
            <SelectValue placeholder="Home" class="text-white" />
            <SelectMarker class="h-6 w-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke-width="2"
                class="stroke-white transition-transform duration-[450ms] group-aria-expanded:-rotate-180"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </SelectMarker>
          </SelectTrigger>
          <SelectListBox class="mt-2 rounded-md border-[1px] border-slate-600 bg-slate-800 text-white">
            <SelectOption
              optionValue="Orders"
              class="rounded-t-md p-4 hover:bg-slate-700 focus:bg-slate-700"
            >
              Orders
            </SelectOption>
            <SelectOption
              optionValue="Settings"
              class="p-4 hover:bg-slate-700 focus:bg-slate-700"
            >
              Settings
            </SelectOption>
            <SelectOption
              optionValue="Contact us"
              class="rounded-b-md p-4 hover:bg-slate-700 focus:bg-slate-700"
            >
              Contact us
            </SelectOption>
          </SelectListBox>
        </SelectRoot>
      </div>

      <div q:slot="codeExample">
        <Slot />
      </div>
    </PreviewCodeExampleTabsDeprecated>
  );
});
