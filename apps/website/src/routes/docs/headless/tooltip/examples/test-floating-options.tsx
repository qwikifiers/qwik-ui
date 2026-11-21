import { component$ } from '@builder.io/qwik';
import { Tooltip } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <Tooltip.Root shift strategy="fixed">
      <Tooltip.Trigger style={{ position: 'fixed', top: '80px', left: 0 }}>
        Edge
      </Tooltip.Trigger>
      <Tooltip.Panel style={{ width: '320px', background: 'white', border: '1px solid' }}>
        A long tooltip on a trigger at the left edge of the window
      </Tooltip.Panel>
    </Tooltip.Root>
  );
});
