import { cn } from '@qwik-ui/utils';
import { type PropsOf, component$ } from '@qwik.dev/core';
import { Progress as HeadlessProgress } from '@qwik-ui/headless';

export const Progress = component$<PropsOf<typeof HeadlessProgress.Root>>((props) => {
  return (
    <HeadlessProgress.Root
      class={cn(
        'relative h-4 w-full overflow-hidden rounded border bg-muted',
        props.class,
      )}
      {...props}
    >
      <HeadlessProgress.Indicator class="h-full w-full flex-1 bg-primary transition-all" />
    </HeadlessProgress.Root>
  );
});
