import { component$, useStyles$ } from '@builder.io/qwik';
import { Popover } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(
    `@layer utilities { .test-p-4 { padding: 1rem; } .test-border { border: 2px solid black; } }`,
  );

  return (
    <Popover.Root>
      <Popover.Trigger>Open popover</Popover.Trigger>
      <Popover.Panel class="test-p-4 test-border">Popover content</Popover.Panel>
    </Popover.Root>
  );
});
