import { cn } from '@qwik-ui/utils';
import { type PropsOf, component$ } from '@builder.io/qwik';
import { Progress as HeadlessProgress } from '@qwik-ui/headless';

export const Progress = component$<PropsOf<typeof HeadlessProgress.Root>>((props) => {
  return (
    <HeadlessProgress.Root
      class={cn(
        'bg-muted relative h-4 w-full overflow-hidden rounded-sm border',
        props.class,
      )}
      {...props}
    >
      <HeadlessProgress.Indicator class="bg-primary h-full w-full flex-1 transition-all" />
    </HeadlessProgress.Root>
  );
});
