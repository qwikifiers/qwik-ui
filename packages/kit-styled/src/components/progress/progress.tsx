import { cn } from '@qwik-ui/utils';
import {
  Progress as QwikUIProgress,
  ProgressIndicator as QwikUIProgressIndicator,
} from '@qwik-ui/headless';
import { PropsOf, component$ } from '@builder.io/qwik';

export const Progress = component$<PropsOf<typeof QwikUIProgress>>((props) => {
  return (
    <QwikUIProgress
      class={cn('bg-secondary relative h-4 w-full overflow-hidden rounded', props?.class)}
    >
      <QwikUIProgressIndicator
        class="bg-primary h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - (props.value || 0)}%)` }}
      />
    </QwikUIProgress>
  );
});
