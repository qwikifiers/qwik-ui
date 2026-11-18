import { component$, useSignal } from '@builder.io/qwik';
import { Popover } from '@qwik-ui/headless';

export default component$(() => {
  const submits = useSignal(0);

  return (
    <form preventdefault:submit onSubmit$={() => submits.value++}>
      <p data-testid="submits">form submits: {submits.value}</p>
      <Popover.Root>
        <Popover.Trigger>Open popover</Popover.Trigger>
        <Popover.Panel style={{ padding: '1rem', border: '1px solid' }}>
          Popover content
        </Popover.Panel>
      </Popover.Root>
    </form>
  );
});
