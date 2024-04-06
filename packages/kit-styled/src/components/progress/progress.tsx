import { cn } from '@qwik-ui/utils';
import {
  Progress as QwikUIProgress,
  ProgressIndicator as QwikUIProgressIndicator,
} from '@qwik-ui/headless';
import { PropsOf, component$ } from '@builder.io/qwik';

export const Progress = component$<PropsOf<typeof QwikUIProgress>>((props) => {
  return (
    <QwikUIProgress
      class={cn('relative h-4 w-full overflow-hidden rounded bg-secondary', props?.class)}
    >
      <QwikUIProgressIndicator
        class="h-full w-full flex-1 bg-primary transition-all"
        style={{ transform: `translateX(-${100 - (props.value || 0)}%)` }}
      />
    </QwikUIProgress>
  );
});
