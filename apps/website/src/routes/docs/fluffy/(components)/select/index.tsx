import { component$, useStyles$ } from '@builder.io/qwik';
import {
  SelectGroup,
  SelectListBox,
  SelectOption,
  SelectRoot,
  SelectValue,
} from '@qwik-ui/headless';
import styles from './select.css?inline';

export default component$(() => {
  useStyles$(styles);
  return (
    <>
      <h2>This is the documentation for the Select</h2>
      <SelectRoot>
        <SelectValue placeholder="Select an option! ⚡" />
        <SelectListBox class="border-base-content bg-base-100 w-full max-w-xs rounded-[0.25rem] border border-opacity-20 py-1">
          <SelectOption
            optionValue="🚀 Qwik"
            class="px-1 leading-loose hover:bg-gray-300"
          />
          <SelectGroup class="">
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
