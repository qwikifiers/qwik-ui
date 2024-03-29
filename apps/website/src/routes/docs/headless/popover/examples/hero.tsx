import { component$ } from '@builder.io/qwik';
import { Popover, PopoverTrigger } from '@qwik-ui/headless';
export default component$(() => {
  return (
    <>
      <PopoverTrigger popovertarget="hero-id" class="popover-trigger">
        Popover Trigger
      </PopoverTrigger>
      <Popover id="hero-id" class="popover">
        My Hero!
      </Popover>
      <div id="content-outside-of-popover"></div>
    </>
  );
});
