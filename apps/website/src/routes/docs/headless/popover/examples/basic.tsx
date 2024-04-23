import { component$ } from '@builder.io/qwik';
import { Popover, PopoverTrigger } from '@qwik-ui/headless';
export default component$(() => {
  return (
    <>
      <PopoverTrigger popovertarget="basic-id" class="popover-trigger">
        Popover Trigger
      </PopoverTrigger>
      <Popover id="basic-id" class="popover">
        My Hero!
      </Popover>
    </>
  );
});
