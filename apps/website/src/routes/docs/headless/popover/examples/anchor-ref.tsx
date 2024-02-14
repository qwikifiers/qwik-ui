import { component$, useSignal } from '@builder.io/qwik';
import { Popover, PopoverTrigger } from '@qwik-ui/headless';
import { usePopover } from '@qwik-ui/headless';

export default component$(() => {
  const { showPopover, hidePopover } = usePopover(`anchor-ref-id`);
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
          popovertarget="anchor-ref-id"
          class="rounded-base border-2 border-slate-300 bg-slate-800 px-3 py-1 text-white"
        >
          Hover over me
        </PopoverTrigger>
      </div>

      <Popover
        ref={popoverRef}
        anchorRef={triggerRef}
        floating={true}
        placement="top"
        gutter={4}
        id="anchor-ref-id"
        class="my-transition listbox rounded-base border-2 border-slate-300 bg-slate-800 !p-4 text-white shadow-md"
      >
        I am anchored to the trigger!
      </Popover>
    </>
  );
});
