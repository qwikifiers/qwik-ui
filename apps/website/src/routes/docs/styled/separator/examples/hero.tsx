import { component$ } from '@builder.io/qwik';
import { Separator } from '@qwik-ui/styled';

export default component$(() => {
  return (
    <div>
      <div class="space-y-1">
        <h4 class="text-sm font-medium leading-none">Qwik UI</h4>
        <p class="text-sm text-muted-foreground">An open-source UI component library.</p>
      </div>
      <Separator class="my-4" />
      <div class="flex h-5 items-center space-x-4 text-sm">
        <div>Customizable</div>
        <Separator orientation="vertical" />
        <div>Accessible</div>
        <Separator orientation="vertical" />
        <div>Optimized for you</div>
      </div>
    </div>
  );
});
