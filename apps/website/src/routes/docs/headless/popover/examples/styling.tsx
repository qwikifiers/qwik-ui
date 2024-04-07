import { component$ } from '@builder.io/qwik';
import { Popover, PopoverTrigger } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <>
      <PopoverTrigger popovertarget="styling-id" class="popover-trigger">
        Popover Trigger
      </PopoverTrigger>
      {/* popover background-color gets overrided */}
      <Popover
        class="popover [&[popover]]: [&[popover]]:border-accent [&[popover]]:bg-primary [&[popover]]:text-background"
        id="styling-id"
      >
        Popover
      </Popover>
    </>
  );
});
