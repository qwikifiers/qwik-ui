import { component$ } from '@builder.io/qwik';
import { Popover, usePopover } from '@qwik-ui/headless';

export default component$(() => {
  const { togglePopover } = usePopover(`programmatic-id`);
  return (
    <>
      <button
        preventdefault:click
        class="rounded-md border-2 border-slate-400 bg-slate-800 px-3 py-1 text-white"
        onKeyDown$={(e) => {
          if (e.key === 'o') {
            togglePopover();
          }
        }}
      >
        Focus me and press the 'o' key!
      </button>
      <Popover
        onBeforeToggle$={() => {
          console.log('I before toggle!');
        }}
        id="programmatic-id"
        class="shadow-dark-medium rounded-md border-2 border-slate-300 bg-slate-800 px-3 py-1 opacity-0"
      >
        I was programmatically opened!
      </Popover>
    </>
  );
});
