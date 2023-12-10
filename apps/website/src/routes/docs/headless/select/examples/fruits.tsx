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
  return (
    <>
      <div>
        <SelectRoot>
          <SelectTrigger class="group peer flex items-center justify-between rounded-md border p-4 px-8">
            <SelectValue placeholder="Pick a fruit" />
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
              optionValue="Orders"
              class="hover:bg-accent focus:bg-accent rounded-t-md p-4"
            >
              Apples
            </SelectOption>
            <SelectOption
              optionValue="Orders"
              class="hover:bg-accent focus:bg-accent rounded-t-md p-4"
            >
              Apricot
            </SelectOption>
            <SelectOption
              optionValue="Orders"
              class="hover:bg-accent focus:bg-accent rounded-t-md p-4"
            >
              Avocado
            </SelectOption>
            <SelectOption
              optionValue="Orders"
              class="hover:bg-accent focus:bg-accent rounded-t-md p-4"
            >
              Grapes
            </SelectOption>
            <SelectOption
              optionValue="Orders"
              class="hover:bg-accent focus:bg-accent rounded-t-md p-4"
            >
              Guava
            </SelectOption>
            <SelectOption
              optionValue="Orders"
              class="hover:bg-accent focus:bg-accent rounded-t-md p-4"
            >
              Oranges
            </SelectOption>
          </SelectListBox>
        </SelectRoot>
      </div>
    </>
  );
});
