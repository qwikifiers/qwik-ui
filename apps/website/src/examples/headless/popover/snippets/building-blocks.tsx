import { component$ } from '@builder.io/qwik';
import { Popover, PopoverContent, PopoverTrigger } from '@qwik-ui/headless';

export default component$(() => (
  <Popover>
    <PopoverContent>
      <div class="bg-gray-500 p-4">Hi, I'm the content</div>
    </PopoverContent>
    <PopoverTrigger> Click on me </PopoverTrigger>
  </Popover>
));
