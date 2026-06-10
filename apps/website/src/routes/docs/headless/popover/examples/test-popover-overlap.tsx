import { component$ } from '@qwik.dev/core';
import { Popover } from '@qwik-ui/headless';
export default component$(() => {
  return (
    <div class="flex flex-row">
      {[0, 1].map((i) => (
        <Popover.Root manual key={i}>
          <Popover.Trigger class="popover-trigger">Popover {i + 1}</Popover.Trigger>
          <Popover.Panel style={{ top: i === 1 ? '25px' : '0' }} class="popover-panel">
            Some super really long text that should overlap {i + 1}
          </Popover.Panel>
        </Popover.Root>
      ))}
    </div>
  );
});
