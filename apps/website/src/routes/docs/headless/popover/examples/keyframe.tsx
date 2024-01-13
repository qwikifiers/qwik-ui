import { component$ } from '@builder.io/qwik';
import { Popover, PopoverTrigger } from '@qwik-ui/headless';
import './listbox-animation';

export default component$(() => {
  return (
    <>
      <PopoverTrigger
        popovertarget="example-id"
        class="rounded-md border-2 border-slate-300 bg-slate-800 px-3 py-1 text-white"
      >
        Popover Trigger
      </PopoverTrigger>
      <Popover
        id="example-id"
        class="shadow-dark-medium rounded-md border-2 border-slate-300 bg-slate-800 px-3 py-1"
      >
        Popover
      </Popover>
    </>
  );
});
