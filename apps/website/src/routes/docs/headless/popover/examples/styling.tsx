import { component$ } from '@builder.io/qwik';
import { Popover, PopoverTrigger } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <>
      <PopoverTrigger popovertarget="styling-id" class="popover-trigger">
        Popover Trigger
      </PopoverTrigger>
      {/* popover bacground-color gets overrided */}
      <Popover class="popover [&[popover]]:bg-primary" id="styling-id">
        Popover
      </Popover>
    </>
  );
});
