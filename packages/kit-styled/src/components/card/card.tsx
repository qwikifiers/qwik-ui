import { component$, type PropsOf, Slot } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';

export const Card = component$<PropsOf<'div'>>((props) => {
  return (
    <div
      {...props}
      class={cn(
        'rounded-base border bg-card text-card-foreground shadow-sm',
        props.class,
      )}
    >
      <Slot />
    </div>
  );
});

export const CardHeader = component$<PropsOf<'div'>>((props) => {
  return (
    <div {...props} class={cn('flex flex-col space-y-1.5 p-6', props.class)}>
      <Slot />
    </div>
  );
});

export const CardTitle = component$<PropsOf<'h3'>>((props) => {
  return (
    <h3 {...props} class={cn('font-semibold leading-none tracking-tight', props.class)}>
      <Slot />
    </h3>
  );
});

export const CardDescription = component$<PropsOf<'p'>>((props) => {
  return (
    <p {...props} class={cn('text-sm text-muted-foreground', props.class)}>
      <Slot />
    </p>
  );
});

export const CardContent = component$<PropsOf<'div'>>((props) => {
  return (
    <div {...props} class={cn('p-6 pt-0', props.class)}>
      <Slot />
    </div>
  );
});

export const CardFooter = component$<PropsOf<'div'>>(({ ...props }) => {
  return (
    <div {...props} class={cn('flex items-center p-6 pt-0', props.class)}>
      <Slot />
    </div>
  );
});

// Experimental API
export const CardImage = component$<PropsOf<'img'>>(({ ...props }) => {
  return <img {...props} class={cn('w-full object-cover', props.class)} />;
});
