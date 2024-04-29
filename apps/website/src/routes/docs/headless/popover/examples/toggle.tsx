import { component$ } from '@builder.io/qwik';
import { Popover, usePopover } from '@qwik-ui/headless';
export default component$(() => {
  const { togglePopover } = usePopover(`toggle-id`);

  return (
    <Popover.Root>
      <button onClick$={() => togglePopover()}>toggle popover</button>
      <Popover.Panel id="toggle-id" class="popover">
        My Hero!
      </Popover.Panel>
    </Popover.Root>
  );
});
