import { component$, useStyles$ } from '@builder.io/qwik';
import {
  SelectGroup,
  SelectLabel,
  SelectListBox,
  SelectOption,
  SelectRoot,
  SelectTrigger,
  SelectValue,
} from '@qwik-ui/headless';
import styles from './select.css?inline';

export default component$(() => {
  useStyles$(styles);
  return (
    <>
      <h2>This is the documentation for the Select</h2>
      <SelectRoot>
        <SelectLabel class="mr-2">Alternate Tailwind Select implementation</SelectLabel>
        <SelectTrigger class="select-caret border-base-content bg-base-100 inline-flex h-12 w-full max-w-xs shrink-0 cursor-pointer items-center justify-between rounded-lg border border-opacity-20 px-4 text-sm font-semibold leading-loose">
          <SelectValue placeholder="Select an option! ⚡" />
        </SelectTrigger>
        <SelectListBox class="border-base-content bg-base-100 w-full max-w-xs rounded-[0.25rem] border border-opacity-20 py-1">
          <SelectOption
            optionValue="🚀 Qwik"
            class="px-1 leading-loose hover:bg-gray-300"
          />
          <SelectGroup class="">
            <SelectLabel class="block px-1 leading-loose">Fruits</SelectLabel>
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
                  class="px-1 leading-loose hover:bg-gray-300"
                />
              );
            })}
          </SelectGroup>
        </SelectListBox>
      </SelectRoot>
    </>
  );
});
