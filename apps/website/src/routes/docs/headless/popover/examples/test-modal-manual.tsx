import { component$, useSignal } from '@builder.io/qwik';
import { Popover } from '@qwik-ui/headless';

export default component$(() => {
  const outsideClicks = useSignal(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <button data-testid="outside" onClick$={() => outsideClicks.value++}>
        outside clicks: {outsideClicks.value}
      </button>
      <Popover.Root modal manual floating="right">
        <Popover.Trigger>Open popover</Popover.Trigger>
        <Popover.Panel style={{ padding: '1rem', border: '1px solid' }}>
          Manual popover
        </Popover.Panel>
      </Popover.Root>
    </div>
  );
});
