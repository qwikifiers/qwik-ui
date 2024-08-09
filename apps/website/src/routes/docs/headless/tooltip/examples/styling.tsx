import { component$ } from '@builder.io/qwik';
import { Tooltip } from '@qwik-ui/headless';
import '../snippets/styling.css';

export default component$(() => {
  return (
    <Tooltip.Root delayDuration={800} gutter={4} flip>
      <Tooltip.Trigger class="custom-trigger">Hover or Focus me</Tooltip.Trigger>
      <Tooltip.Panel class="custom-tooltip-panel">Tooltip content here</Tooltip.Panel>
    </Tooltip.Root>
  );
});
