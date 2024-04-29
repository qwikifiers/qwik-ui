import { component$, useSignal } from '@builder.io/qwik';
import { Popover, usePopover } from '@qwik-ui/headless';
export default component$(() => {
  const popoverId = 'programmatic-id';
  const anchorRef = useSignal<HTMLElement | undefined>();
  const { togglePopover } = usePopover(popoverId);

  return (
    <Popover.Root anchorRef={anchorRef} manual id={popoverId}>
      <button
        ref={anchorRef}
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
