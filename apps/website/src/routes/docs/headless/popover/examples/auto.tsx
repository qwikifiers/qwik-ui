import { component$ } from '@qwik.dev/core';
import { Popover } from '@qwik-ui/headless';
export default component$(() => {
  return (
    <>
      {[0, 1].map((i) => (
        <Popover.Root key={i}>
          <Popover.Trigger class="popover-trigger">
            Popover Trigger {i + 1}
          </Popover.Trigger>
          <Popover.Panel style={{ top: i === 1 ? '25px' : '0' }} class="popover-panel">
            Popover {i + 1}
          </Popover.Panel>
        </Popover.Root>
      ))}
    </>
  );
});
