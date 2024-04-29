import { component$ } from '@builder.io/qwik';
import { Popover } from '@qwik-ui/headless';
export default component$(() => {
  return (
    <Popover.Root>
      <Popover.Trigger class="popover-trigger">Popover Trigger</Popover.Trigger>
      <Popover.Panel class="popover">My Hero!</Popover.Panel>
    </Popover.Root>
  );
});
