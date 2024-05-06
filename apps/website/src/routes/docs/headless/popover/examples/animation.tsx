import { component$ } from '@builder.io/qwik';
import { Popover } from '@qwik-ui/headless';
export default component$(() => {
  return (
    <Popover.Root>
      <Popover.Trigger class="popover-trigger">Popover Trigger</Popover.Trigger>
      <Popover.Panel class="popover-panel popover-animation">
        I'm a popover!
      </Popover.Panel>
    </Popover.Root>
  );
});
