import { component$ } from '@builder.io/qwik';
import { Popover, usePopover } from '@qwik-ui/headless';

export default component$(() => {
  const { togglePopover } = usePopover(`programmatic-id`);
  return (
    <>
      <button
        preventdefault:click
        class="rounded-base border-2 border-slate-400 bg-slate-800 px-3 py-1 text-white"
        onKeyDown$={(e) => {
          if (e.key === 'o') {
            togglePopover();
          }
        }}
      >
        Focus me and press the 'o' key!
      </button>
      <Popover
        id="programmatic-id"
        class="rounded-base border-2 border-slate-300 bg-slate-800 px-3 py-1 opacity-0 shadow-md"
      >
        I was programmatically opened!
      </Popover>
    </>
  );
});
