import { component$ } from '@builder.io/qwik';
import { Popover, PopoverContent, PopoverTrigger } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <>
      <div>
        <Popover placement="top">
          <PopoverContent>
            <div class="bg-accent text-accent-foreground p-4">Hi, I'm the content</div>
          </PopoverContent>
          <PopoverTrigger>Click on me</PopoverTrigger>
        </Popover>
      </div>
    </>
  );
});
