import { component$, useSignal } from '@builder.io/qwik';
import { Popover } from '@qwik-ui/headless';
export default component$(() => {
  const toggleStatus = useSignal<'open' | 'closed'>('closed');

  return (
    <Popover.Root>
      <p>Panel is {toggleStatus.value}!</p>
      <Popover.Trigger class="popover-trigger">Popover Trigger</Popover.Trigger>
      <Popover.Panel
        class="popover-panel"
        onToggle$={(e) => {
          toggleStatus.value = e.newState;
        }}
      >
        My Hero!
      </Popover.Panel>
    </Popover.Root>
  );
});
