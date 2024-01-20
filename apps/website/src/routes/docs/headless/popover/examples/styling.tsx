import { component$ } from '@builder.io/qwik';
import { Popover, PopoverTrigger } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <>
      <PopoverTrigger
        popovertarget="styling-id"
        class="rounded-sm border-2 border-slate-300 bg-slate-800 px-3 py-1 text-white"
      >
        Popover Trigger
      </PopoverTrigger>
      {/* slate gets overrided */}
      <Popover
        class="shadow-dark-medium rounded-sm border-2 border-red-200 bg-slate-600 px-3 py-1 [&[popover]]:bg-red-900"
        id="styling-id"
      >
        Popover
      </Popover>
    </>
  );
});
