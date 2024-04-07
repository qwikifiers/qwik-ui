import { component$, useSignal } from '@builder.io/qwik';
import { Popover, PopoverTrigger } from '@qwik-ui/headless';

export default component$(() => {
  const triggerRef = useSignal<HTMLButtonElement>();
  const popoverRef = useSignal<HTMLElement>();

  return (
    <>
      <div class="popover-container">
        <p>gutter of 40px!</p>
        <PopoverTrigger
          ref={triggerRef}
          popovertarget="gutter-id"
          class="popover-trigger"
        >
          Click me
        </PopoverTrigger>
      </div>

      <Popover
        ref={popoverRef}
        anchorRef={triggerRef}
        floating={true}
        placement="top"
        gutter={40}
        id="gutter-id"
        class="popover"
      >
        I am anchored to the trigger!
      </Popover>
    </>
  );
});
