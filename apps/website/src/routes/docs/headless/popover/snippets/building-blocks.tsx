import { component$ } from '@builder.io/qwik';
import { Popover, PopoverTrigger } from '@qwik-ui/headless';

export default component$(() => (
  <>
    <PopoverTrigger popovertarget="building-block">Trigger</PopoverTrigger>
    <Popover id="building-block">Content</Popover>
  </>
));
