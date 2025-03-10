import { component$, useStyles$ } from '@qwik.dev/core';
import { Popover } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(`
  .popover-transition {
    opacity: 0;
    transform: scale(0.5);
    transition:
      opacity 0.3s ease-out,
      transform 0.3s ease-out,
      display 0.3s,
      overlay 0.3s;
    transition-behavior: allow-discrete;
  }

  .popover-transition:popover-open {
    opacity: 1;
    transform: scale(1);
    transition:
      opacity 0.3s ease-out,
      transform 0.3s ease-out,
      display 0.3s,
      overlay 0.3s;
  }

  @starting-style {
    .popover-transition:popover-open {
      opacity: 0;
      transform: scale(0.5);
    }
  }`);

  return (
    <Popover.Root>
      <Popover.Trigger class="popover-trigger">Popover Trigger</Popover.Trigger>
      <Popover.Panel class="popover-panel popover-transition">
        I'm a popover!
      </Popover.Panel>
    </Popover.Root>
  );
});
