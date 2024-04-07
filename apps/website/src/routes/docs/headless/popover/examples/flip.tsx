import { component$, useSignal } from '@builder.io/qwik';
import { Popover, PopoverTrigger } from '@qwik-ui/headless';

export default component$(() => {
  const triggerRef = useSignal<HTMLButtonElement>();
  const popoverRef = useSignal<HTMLElement>();

  return (
    <>
      <div class="popover-container">
        <p>auto placed on scroll 📜</p>
        <PopoverTrigger
          ref={triggerRef}
          popoverTargetAction="show"
          popovertarget="popover-id"
          class="popover-trigger"
        >
          Click me
        </PopoverTrigger>
      </div>

      <Popover
        ref={popoverRef}
        anchorRef={triggerRef}
        floating={true}
        flip
        gutter={4}
        id="popover-id"
        class="popover"
      >
        I am anchored to the trigger!
      </Popover>
    </>
  );
});
