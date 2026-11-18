import { component$, useSignal } from '@builder.io/qwik';
import { Popover } from '@qwik-ui/headless';

export default component$(() => {
  const cardClicks = useSignal(0);

  return (
    <div class="flex items-center gap-4">
      <button class="popover-trigger" onClick$={() => cardClicks.value++}>
        A clickable card, clicked {cardClicks.value} times
      </button>
      <Popover.Root preventClickThrough gutter={4}>
        <Popover.Trigger class="popover-trigger">More</Popover.Trigger>
        <Popover.Panel class="popover-panel">
          Click the card: I close, and the card is not clicked.
        </Popover.Panel>
      </Popover.Root>
    </div>
  );
});
