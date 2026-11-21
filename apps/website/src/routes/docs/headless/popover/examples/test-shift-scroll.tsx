import { component$ } from '@builder.io/qwik';
import { Popover } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <div
      data-testid="scroller"
      style={{ height: '300px', width: '400px', overflow: 'auto' }}
    >
      <div style={{ height: '1500px', paddingTop: '100px', paddingLeft: '32px' }}>
        <Popover.Root floating="right" shift>
          <Popover.Trigger>Open popover</Popover.Trigger>
          <Popover.Panel style={{ background: 'white', border: '1px solid' }}>
            Beside the trigger
          </Popover.Panel>
        </Popover.Root>
      </div>
    </div>
  );
});
