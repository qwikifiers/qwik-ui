import { PropsOf, Slot, component$ } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';

const Avatar = component$<PropsOf<'div'>>(({ ...props }) => {
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

const AvatarImage = component$<PropsOf<'img'>>(({ ...props }) => (
  <img {...props} class={cn('aspect-square h-full w-full', props.class)} />
));

const AvatarFallback = component$<PropsOf<'div'>>(({ ...props }) => {
  return (
    <div
      {...props}
      class={cn(
        'bg-muted absolute -z-10 flex h-full w-full items-center justify-center rounded-full',
        props.class,
      )}
    >
      <Slot />
    </div>
  );
});

export { Avatar, AvatarImage, AvatarFallback };
