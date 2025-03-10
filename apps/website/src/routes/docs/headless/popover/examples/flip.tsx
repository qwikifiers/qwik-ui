import { component$ } from '@qwik.dev/core';
import { Popover } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <Popover.Root gutter={4}>
      <div class="popover-container">
        <p>auto placed on scroll 📜</p>
        <Popover.Trigger class="popover-trigger">Click me</Popover.Trigger>
      </div>

      <Popover.Panel class="popover-panel">I am anchored to the trigger!</Popover.Panel>
    </Popover.Root>
  );
});
