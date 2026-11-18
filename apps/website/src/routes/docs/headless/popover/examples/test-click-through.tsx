import { component$, useSignal } from '@builder.io/qwik';
import { Popover } from '@qwik-ui/headless';

export default component$(() => {
  const isOn = useSignal(true);
  const isMounted = useSignal(true);
  const outsideClicks = useSignal(0);
  const panelClicks = useSignal(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <label>
        <input type="checkbox" bind:checked={isOn} /> preventClickThrough
      </label>
      <label>
        <input type="checkbox" bind:checked={isMounted} /> mounted
      </label>
      <button data-testid="outside" onClick$={() => outsideClicks.value++}>
        outside clicks: {outsideClicks.value}
      </button>
      <a href="#followed">Outside link</a>
      {isMounted.value && (
        <Popover.Root preventClickThrough={isOn.value} floating="right">
          <Popover.Trigger>Open popover</Popover.Trigger>
          <Popover.Panel style={{ padding: '1rem', border: '1px solid' }}>
            <button onClick$={() => panelClicks.value++}>
              panel clicks: {panelClicks.value}
            </button>
          </Popover.Panel>
        </Popover.Root>
      )}
    </div>
  );
});
