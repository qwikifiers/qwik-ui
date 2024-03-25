import { cn } from '@qwik-ui/utils';
import * as ProgressPrimitive from '@qwik-ui/headless';
import { PropsOf, component$ } from '@builder.io/qwik';

export const Progress = component$<PropsOf<typeof ProgressPrimitive.Root>>((props) => {
  return (
    <ProgressPrimitive.Root
      class={cn('bg-secondary relative h-4 w-full overflow-hidden rounded', props?.class)}
    >
      <ProgressPrimitive.Indicator
        class="bg-primary h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - (props.value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});
