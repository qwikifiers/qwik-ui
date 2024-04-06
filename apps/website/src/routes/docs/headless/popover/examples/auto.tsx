import { component$ } from '@builder.io/qwik';
import { Popover, PopoverTrigger } from '@qwik-ui/headless';
export default component$(() => {
  return (
    <>
      <PopoverTrigger popovertarget="auto-1" class="popover-trigger">
        Popover Trigger 1
      </PopoverTrigger>
      <Popover id="auto-1" class="popover">
        Popover 1
      </Popover>
      <PopoverTrigger popovertarget="auto-2" class="popover-trigger">
        Popover Trigger 2
      </PopoverTrigger>
      <Popover id="auto-2" class="popover" style={{ top: '100px' }}>
        Popover 2
      </Popover>
    </>
  );
});
