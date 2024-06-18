import { component$ } from '@builder.io/qwik';
import { Popover, usePopover } from '@qwik-ui/headless';
export default component$(() => {
  const { hidePopover } = usePopover('hide-id');

  return (
    <Popover.Root id="hide-id" manual hover>
      <button onClick$={() => hidePopover()}>hide popover</button>
      <Popover.Trigger class="popover-trigger">Click me</Popover.Trigger>
      <Popover.Panel class="popover">My Hero!</Popover.Panel>
    </Popover.Root>
  );
});
