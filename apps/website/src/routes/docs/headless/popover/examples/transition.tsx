import { component$ } from '@builder.io/qwik';
import { Popover } from '@qwik-ui/headless';
export default component$(() => {
  return (
    <Popover.Root>
      <Popover.Trigger popovertarget="transition-id" class="popover-trigger">
        Popover Trigger
      </Popover.Trigger>
      <Popover.Panel id="transition-id" class="popover popover-transition">
        I'm a popover!
      </Popover.Panel>
    </Popover.Root>
  );
});
