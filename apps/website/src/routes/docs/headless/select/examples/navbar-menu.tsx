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
            <SelectValue placeholder="Home" />
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
              Orders
            </SelectOption>
            <SelectOption
              optionValue="Settings"
              class="hover:bg-accent focus:bg-accent p-4"
            >
              Settings
            </SelectOption>
            <SelectOption
              optionValue="Contact us"
              class="hover:bg-accent focus:bg-accent rounded-b-md p-4"
            >
              Contact us
            </SelectOption>
          </SelectListBox>
        </SelectRoot>
      </div>
    </>
  );
});
