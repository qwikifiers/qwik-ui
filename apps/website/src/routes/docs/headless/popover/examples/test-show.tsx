import { component$, useSignal } from '@builder.io/qwik';
import { Popover, usePopover } from '@qwik-ui/headless';
export default component$(() => {
  const { showPopover } = usePopover(`show-id`);
  const anchorRef = useSignal<HTMLElement | undefined>();

  return (
    <Popover.Root id="show-id" bind:anchor={anchorRef}>
      <button ref={anchorRef} onClick$={() => showPopover()}>
        show popover
      </button>
      <Popover.Panel class="popover">My Hero!</Popover.Panel>
    </Popover.Root>
  );
});
