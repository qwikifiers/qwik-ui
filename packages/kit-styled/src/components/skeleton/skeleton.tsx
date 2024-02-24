import { QwikIntrinsicElements, component$ } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';

export const Skeleton = component$<QwikIntrinsicElements['div']>(({ ...props }) => {
  return (
    <div {...props} class={cn('bg-foreground/10 animate-pulse rounded', props.class)} />
  );
});
