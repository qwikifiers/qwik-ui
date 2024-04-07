import { component$ } from '@builder.io/qwik';
import { Popover, PopoverTrigger } from '@qwik-ui/headless';
export default component$(() => {
  return (
    <>
      <PopoverTrigger popovertarget="transition-id" class="popover-trigger">
        Popover Trigger
      </PopoverTrigger>
      <Popover id="transition-id" class="popover popover-transition">
        I'm a popover!
      </Popover>
    </>
  );
});
