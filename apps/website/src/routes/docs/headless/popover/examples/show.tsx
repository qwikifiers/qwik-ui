import { component$ } from '@builder.io/qwik';
import { Popover, usePopover } from '@qwik-ui/headless';
export default component$(() => {
  const { showPopover } = usePopover(`show-id`);

  return (
    <>
      <button onClick$={() => showPopover()}>show popover</button>
      <Popover id="show-id" class="popover">
        My Hero!
      </Popover>
    </>
  );
});
