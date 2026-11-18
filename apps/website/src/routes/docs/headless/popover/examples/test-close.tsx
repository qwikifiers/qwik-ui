import { component$, useSignal } from '@builder.io/qwik';
import { Popover } from '@qwik-ui/headless';

export default component$(() => {
  const closeClicks = useSignal(0);

  return (
    <>
      <p data-testid="close-clicks">close clicks: {closeClicks.value}</p>
      <Popover.Root>
        <Popover.Trigger>Open popover</Popover.Trigger>
        <Popover.Panel>
          <Popover.Close onClick$={() => closeClicks.value++}>Close</Popover.Close>
        </Popover.Panel>
      </Popover.Root>
    </>
  );
});
