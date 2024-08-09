import { component$ } from '@builder.io/qwik';
import { Tooltip } from '@qwik-ui/headless';

import '../snippets/transition.css';

export default component$(() => {
  return (
    <Tooltip.Root gutter={4} flip>
      <Tooltip.Trigger>Hover or Focus me</Tooltip.Trigger>
      <Tooltip.Panel class="tooltip-transition">
        Tooltip content with transition
      </Tooltip.Panel>
    </Tooltip.Root>
  );
});
