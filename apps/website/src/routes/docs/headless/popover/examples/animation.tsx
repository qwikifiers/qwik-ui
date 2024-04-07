import { component$ } from '@builder.io/qwik';
import { Popover, PopoverTrigger } from '@qwik-ui/headless';
export default component$(() => {
  return (
    <>
      <PopoverTrigger popovertarget="animation-id" class="popover-trigger">
        Popover Trigger
      </PopoverTrigger>
      <Popover id="animation-id" class="popover popover-animation">
        I'm a popover!
      </Popover>
    </>
  );
});
