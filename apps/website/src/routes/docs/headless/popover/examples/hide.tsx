import { component$ } from '@builder.io/qwik';
import { Popover, PopoverTrigger, usePopover } from '@qwik-ui/headless';
export default component$(() => {
  const { hidePopover } = usePopover(`hide-id`);

  return (
    <>
      <button onClick$={() => hidePopover()}>hide popover</button>
      <PopoverTrigger popovertarget="hide-id" class="popover-trigger">
        Click me
      </PopoverTrigger>
      <Popover id="hide-id" class="popover">
        My Hero!
      </Popover>
    </>
  );
});
