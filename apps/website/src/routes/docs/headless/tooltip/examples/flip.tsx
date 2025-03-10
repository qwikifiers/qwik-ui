import { component$ } from '@qwik.dev/core';
import { Tooltip } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <Tooltip.Root gutter={4} flip>
      <Tooltip.Trigger>Hover or Focus me</Tooltip.Trigger>
      <Tooltip.Panel class="tooltip-panel">
        Tooltip content with flip enabled
      </Tooltip.Panel>
    </Tooltip.Root>
  );
});
