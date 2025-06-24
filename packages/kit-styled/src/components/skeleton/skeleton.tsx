import { type PropsOf, component$ } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';

export const Skeleton = component$<PropsOf<'div'>>(({ ...props }) => {
  return (
    <div
      {...props}
      class={cn('bg-foreground/10 animate-pulse rounded-sm', props.class)}
    />
  );
});
