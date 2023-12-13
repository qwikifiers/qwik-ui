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
                class="stroke-slate-50 transition-transform duration-[450ms] group-aria-expanded:-rotate-180"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </SelectMarker>
          </SelectTrigger>
          <SelectListBox class="mt-2 rounded-md border bg-slate-950 text-slate-50">
            <SelectOption
              optionValue="Orders"
              class="rounded-t-md p-4 hover:bg-slate-400 focus:bg-slate-400"
            >
              Orders
            </SelectOption>
            <SelectOption
              optionValue="Settings"
              class="p-4 hover:bg-slate-400 focus:bg-slate-400"
            >
              Settings
            </SelectOption>
            <SelectOption
              optionValue="Contact us"
              class="rounded-b-md p-4 hover:bg-slate-400 focus:bg-slate-400"
            >
              Contact us
            </SelectOption>
          </SelectListBox>
        </SelectRoot>
      </div>
    </>
  );
});
