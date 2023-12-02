import { component$ } from '@builder.io/qwik';
import { Popover, PopoverTrigger } from '@qwik-ui/headless';

export default component$(() => (
  <Popover id="building-block">
    <div class="bg-gray-500 p-4">Hi, I'm the content</div>
    <PopoverTrigger popovertarget="building-block"> Click on me </PopoverTrigger>
  </Popover>
));
