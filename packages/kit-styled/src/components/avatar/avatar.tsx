import { type PropsOf, Slot, component$ } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';

const Root = component$<PropsOf<'div'>>(({ ...props }) => {
  return (
    <div
      {...props}
      class={cn(
        'relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full',
        props.class,
      )}
    >
      <Slot />
    </div>
  );
});

const Image = component$<PropsOf<'img'>>(({ ...props }) => (
  <img {...props} class={cn('aspect-square h-full w-full', props.class)} />
));

const Fallback = component$<PropsOf<'div'>>(({ ...props }) => {
  return (
    <div
      {...props}
      class={cn(
        'absolute -z-10 flex h-full w-full items-center justify-center rounded-full bg-muted',
        props.class,
      )}
    >
      <Slot />
    </div>
  );
});

export const Avatar = {
  Root,
  Image,
  Fallback,
};
