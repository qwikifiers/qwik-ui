import { component$, useStyles$ } from '@qwik.dev/core';
import { Tooltip } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(`
    .tooltip-animation {
      animation: tooltip-shrink 0.4s ease-in-out forwards;
    }

    .tooltip-animation:popover-open {
      animation: tooltip-grow 0.5s ease-in-out forwards;
    }

    @keyframes tooltip-shrink {
      from {
        transform: scale(1);
        display: block;
      }
      to {
        transform: scale(0);
        display: none;
      }
    }

    @keyframes tooltip-grow {
      from {
        transform: scale(0);
      }
      to {
        transform: scale(1);
      }
    }`);

  return (
    <Tooltip.Root gutter={4} flip>
      <Tooltip.Trigger>Hover or Focus me</Tooltip.Trigger>
      <Tooltip.Panel class="tooltip-animation">
        Animated tooltip content here
      </Tooltip.Panel>
    </Tooltip.Root>
  );
});
