import { component$ } from '@builder.io/qwik';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@qwik-ui/headless';
import { DoubleChevron } from '~/components/icons/double-chevron';
import './collapsible.css';

export default component$(() => {
  return (
    <Collapsible class="flex flex-col">
      <div class="mb-2 flex items-center justify-between px-2">
        <span class="w-fit">
          <strong>@thejackshelton</strong> starred 3 repositories
        </span>
        <CollapsibleTrigger class="mx-2 mr-0 rounded-base bg-slate-700 p-1 text-white shadow-lg dark:bg-slate-800">
          <DoubleChevron class="size-4" />
        </CollapsibleTrigger>
      </div>
      <div class="mx-2 mb-2 rounded-base bg-slate-700 p-2 text-white shadow-md dark:bg-slate-800">
        @qwik-ui/headless
      </div>
      <CollapsibleContent class="animation">
        <div class="mx-2 mb-2 rounded-base bg-slate-700 p-2 text-white shadow-md dark:bg-slate-800">
          @builder.io/qwik
        </div>
        <div class="mx-2 rounded-base bg-slate-700 p-2 text-white shadow-md dark:bg-slate-800">
          @qwikdev/astro
        </div>
        <div class="p-2"></div>
      </CollapsibleContent>
    </Collapsible>
  );
});
