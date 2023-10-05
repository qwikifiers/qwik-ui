import { component$ } from '@builder.io/qwik';
import { Popover } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <>
      <button
        // @ts-ignore
        popovertarget="example-id"
        class="rounded-md border-2 border-slate-300 bg-slate-800 px-3 py-1 text-white"
      >
        Popover Trigger
      </button>
      <Popover
        id="example-id"
        class="shadow-dark-medium rounded-md border-2 border-slate-300 bg-slate-800 px-3 py-1"
      >
        Popover
      </Popover>
    </>
  );
});
