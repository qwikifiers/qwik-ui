import { component$ } from '@builder.io/qwik';
import { Tooltip } from '@qwik-ui/headless';

import '../snippets/animation.css';

export default component$(() => {
  return (
    <Tooltip.Root gutter={4} flip>
      <Tooltip.Trigger>Hover or Focus me</Tooltip.Trigger>
      <Tooltip.Panel class="tooltip-animation">
        Animated tooltip content here
      </Tooltip.Panel>
    </Tooltip.Root>
  );
});
