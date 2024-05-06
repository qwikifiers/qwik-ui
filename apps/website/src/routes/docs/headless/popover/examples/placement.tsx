import { component$ } from '@builder.io/qwik';
import { Popover } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <Popover.Root hover gutter={4} floating="right">
      <div class="popover-container">
        <p>popover on the right ⤵️</p>
        <Popover.Trigger class="popover-trigger">Hover over me</Popover.Trigger>
      </div>

      <Popover.Panel class="popover-panel">I am anchored to the trigger!</Popover.Panel>
    </Popover.Root>
  );
});
