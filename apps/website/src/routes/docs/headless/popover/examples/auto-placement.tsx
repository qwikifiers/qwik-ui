import { component$, useSignal } from '@builder.io/qwik';
import { Popover, PopoverTrigger } from '@qwik-ui/headless';

export default component$(() => {
  const triggerRef = useSignal<HTMLButtonElement>();
  const popoverRef = useSignal<HTMLElement>();

  return (
    <>
      <div class="flex flex-col items-center justify-center gap-2">
        <p>auto placed on scroll 📜</p>
        <PopoverTrigger
          ref={triggerRef}
          popoverTargetAction="show"
          popovertarget="auto-placement-id"
          class="popover-trigger"
        >
          Click me
        </PopoverTrigger>
      </div>

      <Popover
        ref={popoverRef}
        anchorRef={triggerRef}
        floating={true}
        flip={false}
        autoPlacement
        gutter={4}
        id="auto-placement-id"
        class="popover listbox !p-4"
      >
        I am anchored to the trigger!
      </Popover>
    </>
  );
});
