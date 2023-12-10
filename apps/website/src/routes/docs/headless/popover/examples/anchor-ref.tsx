import { component$, useSignal } from '@builder.io/qwik';
import { Popover, PopoverTrigger } from '@qwik-ui/headless';
import { usePopover } from '@qwik-ui/headless';

export default component$(() => {
  const buttonRef = useSignal<HTMLButtonElement>();
  const { initPopover$ } = usePopover(`anchor-ref-id`);
  const myPopoverRef = useSignal<HTMLElement>();

  return (
    <>
      <div>
        We're using popover target action on the trigger.{' '}
        <PopoverTrigger
          ref={buttonRef}
          disableClickInitPopover
          onMouseEnter$={() => {
            initPopover$();
            myPopoverRef.value?.togglePopover();
          }}
          onMouseLeave$={() => {
            myPopoverRef.value?.togglePopover();
          }}
          popoverTargetAction="show"
          popovertarget="anchor-ref-id"
          class="rounded-md border-2 border-slate-300 bg-slate-800 px-3 py-1 text-white"
        >
          Popover Trigger
        </PopoverTrigger>
      </div>

      <Popover
        anchorRef={buttonRef}
        popoverRef={myPopoverRef}
        floating={true}
        placement="top"
        gutter={4}
        id="anchor-ref-id"
        class="listbox shadow-dark-low rounded-md border-2 border-slate-300 bg-slate-800 !p-4 text-white"
      >
        I am anchored to the trigger!
      </Popover>
    </>
  );
});
