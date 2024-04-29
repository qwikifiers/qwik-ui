import { component$ } from '@builder.io/qwik';
import { Popover, usePopover } from '@qwik-ui/headless';
export default component$(() => {
  const popoverId = 'programmatic-id';
  const { showPopover } = usePopover(popoverId);

  return (
    <Popover.Root manual id={popoverId}>
      <button
        class="popover-invoker"
        preventdefault:click
        onKeyDown$={async (e) => {
          if (e.key === 'o') {
            await showPopover();
          }
        }}
      >
        Focus me and press the 'o' key!
      </button>
      <Popover.Panel class="popover">I was programmatically opened!</Popover.Panel>
    </Popover.Root>
  );
});
