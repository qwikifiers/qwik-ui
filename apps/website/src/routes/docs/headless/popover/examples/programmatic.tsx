import { component$ } from '@builder.io/qwik';
import { Popover, usePopover } from '@qwik-ui/headless';
export default component$(() => {
  const { togglePopover } = usePopover(`programmatic-id`);

  return (
    <Popover.Root id="programmatic-id">
      <button
        class="popover-invoker"
        preventdefault:click
        onKeyDown$={async (e) => {
          if (e.key === 'o') {
            await togglePopover();
          }
        }}
      >
        Focus me and press the 'o' key!
      </button>
      <Popover.Panel class="popover">I was programmatically opened!</Popover.Panel>
    </Popover.Root>
  );
});
