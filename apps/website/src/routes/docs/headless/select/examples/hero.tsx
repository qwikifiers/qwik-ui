import { component$ } from '@builder.io/qwik';
import {
  SelectListBox,
  SelectMarker,
  SelectOption,
  SelectRoot,
  SelectTrigger,
  SelectValue,
} from '@qwik-ui/headless';

export default component$(() => {
  const fruitArray = [
    { value: 'Apple 🍎', disabled: false },
    { value: 'Banana 🍌', disabled: false },
    { value: 'Cherry 🍒', disabled: false },
    { value: 'Dragonfruit 🐲', disabled: true },
  ];

  return (
    <>
      <div>
        <SelectRoot>
          <SelectTrigger class="group peer flex items-center justify-between rounded-md border border-slate-600 bg-slate-800 p-4 px-8">
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
          <SelectListBox class="mt-2 rounded-md border border-slate-600 bg-slate-800 text-white">
            <SelectOption
              optionValue="Qwik 🚀 "
              class="p-4 hover:bg-slate-700 focus:bg-slate-700"
            >
              Qwik 🚀
            </SelectOption>
            {fruitArray.map((option) => {
              return (
                <SelectOption
                  key={option.value}
                  optionValue={option.value.toString()}
                  disabled={option.disabled}
                  class="rounded-sm p-4 hover:bg-slate-700 aria-disabled:cursor-not-allowed aria-disabled:text-red-500"
                >
                  {option.value}
                </SelectOption>
              );
            })}
          </SelectListBox>
        </SelectRoot>
      </div>
    </>
  );
});
