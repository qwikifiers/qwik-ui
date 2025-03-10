import { component$ } from '@qwik.dev/core';
import { Popover } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <Popover.Root gutter={4} floating="right">
      <div class="popover-container">
        <p>popover on the right ⤵️</p>
        <Popover.Trigger class="popover-trigger">Click me</Popover.Trigger>
      </div>

      <Popover.Panel class="popover-panel">I am anchored to the trigger!</Popover.Panel>
    </Popover.Root>
  );
});
