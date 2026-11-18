import { component$ } from '@builder.io/qwik';
import { Popover } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <Popover.Root gutter={4}>
      <Popover.Trigger class="popover-trigger">Open</Popover.Trigger>
      <Popover.Panel class="popover-panel">
        <p>Done reading?</p>
        <Popover.Close class="popover-trigger">Close</Popover.Close>
      </Popover.Panel>
    </Popover.Root>
  );
});
