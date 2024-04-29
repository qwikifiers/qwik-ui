import { component$ } from '@builder.io/qwik';
import { Popover, usePopover } from '@qwik-ui/headless';
export default component$(() => {
  const { showPopover } = usePopover(`show-id`);

  return (
    <Popover.Root>
      <button onClick$={() => showPopover()}>show popover</button>
      <Popover.Panel id="show-id" class="popover">
        My Hero!
      </Popover.Panel>
    </Popover.Root>
  );
});
