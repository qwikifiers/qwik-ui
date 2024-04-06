import { component$, useSignal } from '@builder.io/qwik';
import { Popover, PopoverTrigger } from '@qwik-ui/headless';
import { usePopover } from '@qwik-ui/headless';

export default component$(() => {
  const { showPopover, hidePopover } = usePopover(`placement-id`);
  const triggerRef = useSignal<HTMLButtonElement>();
  const popoverRef = useSignal<HTMLElement>();

  return (
    <>
      <div class="flex flex-col items-center justify-center gap-2">
        <p>I'm a mini tooltip!</p>
        <PopoverTrigger
          ref={triggerRef}
          disableClickInitPopover
          onPointerEnter$={() => {
            showPopover();
          }}
          onPointerLeave$={() => {
            hidePopover();
          }}
          popoverTargetAction="show"
          popovertarget="placement-id"
          class="popover-trigger"
        >
          Hover over me
        </PopoverTrigger>
      </div>

      <Popover
        ref={popoverRef}
        anchorRef={triggerRef}
        floating={true}
        placement="right"
        gutter={4}
        id="placement-id"
        class="popover listbox !p-4"
      >
        I am anchored to the trigger!
      </Popover>
    </>
  );
});
