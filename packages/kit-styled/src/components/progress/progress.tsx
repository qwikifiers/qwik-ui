import { cn } from '@qwik-ui/utils';
import { type PropsOf, component$ } from '@builder.io/qwik';
import { Progress as HeadlessProgress } from '@qwik-ui/headless';

export const Progress = component$<PropsOf<typeof HeadlessProgress.Root>>((props) => {
  return (
    <HeadlessProgress.Root
      class={cn('relative h-4 w-full overflow-hidden rounded bg-secondary', props?.class)}
    >
      <HeadlessProgress.Indicator
        class="h-full w-full flex-1 bg-primary transition-all"
        style={{ transform: `translateX(-${100 - (props.value || 0)}%)` }}
      />
    </HeadlessProgress.Root>
  );
});
