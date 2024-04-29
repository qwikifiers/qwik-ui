import { component$ } from '@builder.io/qwik';
import { Popover } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <Popover.Root gutter={4}>
      <Popover.Trigger class="popover-trigger">Click me</Popover.Trigger>
      <Popover.Panel class="popover">I am anchored to the popover trigger!</Popover.Panel>
    </Popover.Root>
  );
});
