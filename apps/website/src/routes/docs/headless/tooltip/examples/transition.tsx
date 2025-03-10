import { component$, useStyles$ } from '@qwik.dev/core';
import { Tooltip } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(`
    .tooltip-transition {
      opacity: 0;
      transform: scaleX(0);
      transition: all 0.7s ease;
      transition-behavior: allow-discrete;
    }

    .tooltip-transition:popover-open {
      opacity: 1;
      transform: scaleX(1);
    }

    @starting-style {
      .tooltip-transition:popover-open {
        opacity: 0;
        transform: scaleX(0);
      }
    }`);

  return (
    <Tooltip.Root gutter={4} flip>
      <Tooltip.Trigger>Hover or Focus me</Tooltip.Trigger>
      <Tooltip.Panel class="tooltip-transition">
        Tooltip content with transition
      </Tooltip.Panel>
    </Tooltip.Root>
  );
});
