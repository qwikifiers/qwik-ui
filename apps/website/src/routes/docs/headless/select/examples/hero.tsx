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
          <SelectTrigger class="group peer flex items-center justify-between rounded-md border p-4 px-8">
            <SelectValue placeholder="Select a fruit! 🍹" />
            <SelectMarker class="h-6 w-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke-width="2"
                class="stroke-foreground transition-transform duration-[450ms] group-aria-expanded:-rotate-180"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </SelectMarker>
          </SelectTrigger>
          <SelectListBox class="bg-background mt-2 rounded-md border">
            <SelectOption
              optionValue="Qwik 🚀 "
              class="hover:bg-accent focus:bg-accent p-4"
            >
              Qwik 🚀
            </SelectOption>
            {fruitArray.map((option) => {
              return (
                <SelectOption
                  key={option.value}
                  optionValue={option.value.toString()}
                  disabled={option.disabled}
                  class="hover:bg-accent aria-disabled:text-muted-foreground aria-disabled:bg-muted rounded-sm p-4 aria-disabled:cursor-not-allowed"
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
