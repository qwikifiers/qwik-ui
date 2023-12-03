import { component$ } from '@builder.io/qwik';
import { Popover, PopoverTrigger } from '@qwik-ui/headless';
export default component$(() => {
  return (
    <>
      <PopoverTrigger
        popovertarget="animation-id"
        class="rounded-md border-2 border-slate-300 bg-slate-800 px-3 py-1 text-white"
      >
        Popover Trigger
      </PopoverTrigger>
      <Popover
        transition
        entryAnimation="opacity-100"
        exitAnimation="opacity-0"
        id="animation-id"
        class="shadow-dark-medium ease rounded-md border-2 border-slate-300 bg-slate-800 px-3 py-1 opacity-0 transition-opacity duration-500"
      >
        Popover
      </Popover>
    </>
  );
});