import { component$ } from '@builder.io/qwik';
import { Popover, PopoverContent, PopoverTrigger } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <>
      <div>
        <Popover placement="top">
          <PopoverContent>
            <div class="bg-slate-400 p-4 text-slate-950">
              Hi, I'm the content, but now on top
            </div>
          </PopoverContent>
          <PopoverTrigger>Click on me</PopoverTrigger>
        </Popover>
      </div>
    </>
  );
});
