import { component$, useSignal } from '@builder.io/qwik';
import { Popover, PopoverTrigger } from '@qwik-ui/headless';

export default component$(() => {
  const triggerRef = useSignal<HTMLButtonElement>();

  return (
    <>
      <PopoverTrigger ref={triggerRef} popovertarget="popover-id" class="popover-trigger">
        Click me
      </PopoverTrigger>
      <Popover
        anchorRef={triggerRef}
        floating={true}
        gutter={4}
        id="popover-id"
        class="popover"
      >
        I am anchored to the popover trigger!
      </Popover>
    </>
  );
});
