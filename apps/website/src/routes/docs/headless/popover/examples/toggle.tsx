import { component$ } from '@builder.io/qwik';
import { Popover, usePopover } from '@qwik-ui/headless';
export default component$(() => {
  const { togglePopover } = usePopover(`toggle-id`);

  return (
    <>
      <button onClick$={() => togglePopover()}>toggle popover</button>
      <Popover id="toggle-id" class="popover">
        My Hero!
      </Popover>
    </>
  );
});
