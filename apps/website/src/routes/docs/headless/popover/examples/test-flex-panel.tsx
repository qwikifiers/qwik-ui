import { component$, useStyles$ } from '@builder.io/qwik';
import { Popover } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(`.test-flex { display: flex; gap: 0.5rem; }`);

  return (
    <Popover.Root>
      <Popover.Trigger>Open popover</Popover.Trigger>
      <Popover.Panel class="test-flex">
        <button>Edit</button>
        <button>Delete</button>
      </Popover.Panel>
    </Popover.Root>
  );
});
