import { QwikIntrinsicElements, component$ } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';

export const Skeleton = component$<QwikIntrinsicElements['div']>(({ ...props }) => {
  return <div {...props} class={cn('bg-accent animate-pulse rounded', props.class)} />;
});
