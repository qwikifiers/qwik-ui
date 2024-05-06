import { component$ } from '@builder.io/qwik';
import { Popover } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <Popover.Root hover gutter={4} floating="top-end">
      <div class="popover-container">
        <Popover.Trigger class="popover-trigger">Hover over me</Popover.Trigger>
      </div>

      <Popover.Panel class="popover-panel">I am on the top-right corner!</Popover.Panel>
    </Popover.Root>
  );
});
