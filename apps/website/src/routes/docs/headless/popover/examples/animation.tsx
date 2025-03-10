import { component$, useStyles$ } from '@qwik.dev/core';
import { Popover } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(`
  .popover-animation {
    animation: popover-shrink 0.4s ease-in-out forwards;
  }

  /* For exit animation */
  .popover-animation:popover-open {
    animation: popover-grow 0.5s ease-in-out forwards;
  }

  @keyframes popover-shrink {
    from {
      transform: scale(1);
      display: block;
    }

    to {
      transform: scale(0);
      display: none;
    }
  }

  @keyframes popover-grow {
    from {
      transform: scale(0);
    }

    to {
      transform: scale(1);
    }
  }
  `);

  return (
    <Popover.Root>
      <Popover.Trigger class="popover-trigger">Popover Trigger</Popover.Trigger>
      <Popover.Panel class="popover-panel popover-animation">
        I'm a popover!
      </Popover.Panel>
    </Popover.Root>
  );
});
