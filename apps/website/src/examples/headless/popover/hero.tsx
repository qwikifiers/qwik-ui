import { component$ } from '@builder.io/qwik';
import { Popover, PopoverContent, PopoverTrigger } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <>
      <div>
        <Popover placement="top">
          <PopoverContent>
            <div class="bg-slate-500 p-4 text-white">Hi, I'm the content</div>
          </PopoverContent>
          <PopoverTrigger class="text-white">Click on me</PopoverTrigger>
        </Popover>
      </div>
    </>
  );
});
