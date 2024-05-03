import { cn } from '@qwik-ui/utils';
import { PropsOf, component$ } from '@builder.io/qwik';
import { Progress as QwikUIProgress } from '@qwik-ui/headless';

export const Progress = component$<PropsOf<typeof QwikUIProgress.Root>>((props) => {
  return (
    <QwikUIProgress.Root
      class={cn('relative h-4 w-full overflow-hidden rounded bg-secondary', props?.class)}
    >
      <QwikUIProgress.Indicator
        class="h-full w-full flex-1 bg-primary transition-all"
        style={{ transform: `translateX(-${100 - (props.value || 0)}%)` }}
      />
    </QwikUIProgress.Root>
  );
});
