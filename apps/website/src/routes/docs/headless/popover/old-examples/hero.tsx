import { component$ } from '@builder.io/qwik';
import { Popover, PopoverTrigger } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <>
      <PopoverTrigger
        popovertarget="hero-id"
        class="rounded-md border-2 border-slate-300 bg-slate-800 px-3 py-1 text-white"
      >
        Popover Trigger
      </PopoverTrigger>
      <Popover
        id="hero-id"
        class="shadow-dark-medium rounded-md border-2 border-slate-300 bg-slate-800 px-3 py-1"
      >
        My Hero!
      </Popover>
    </>
  );
});
