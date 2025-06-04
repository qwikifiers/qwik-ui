import { component$ } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';
import { LuChevronsUpDown } from '@qwikest/icons/lucide';
import { buttonVariants, Collapsible } from '~/components/ui';

export default component$(() => {
  return (
    <Collapsible.Root class="flex w-[350px] flex-col gap-2">
      <div class="flex items-center justify-between gap-4 px-4">
        <h4 class="text-sm font-semibold">@peduarte starred 3 repositories</h4>
        <Collapsible.Trigger
          class={cn(buttonVariants({ size: 'icon', look: 'ghost' }), 'size-8')}
        >
          <LuChevronsUpDown />
        </Collapsible.Trigger>
      </div>
      <div class="rounded-md border px-4 py-2 font-mono text-sm">@qwik-ui/headless</div>
      <Collapsible.Content>
        <div class="flex flex-col gap-2">
          <div class="rounded-md border px-4 py-2 font-mono text-sm">
            @qwik-ui/kit-styled
          </div>
          <div class="rounded-md border px-4 py-2 font-mono text-sm">
            @qwik-ui/kit-headless
          </div>
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
});
