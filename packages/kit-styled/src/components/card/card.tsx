import { component$, type PropsOf, Slot } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';

const Card = component$<PropsOf<'div'>>((props) => {
  return (
    <div
      {...props}
      class={cn(
        'bg-card text-card-foreground rounded-base border-base shadow',
        props.class,
      )}
    >
      <Slot />
    </div>
  );
});

const CardHeader = component$<PropsOf<'div'>>((props) => {
  return (
    <div {...props} class={cn('flex flex-col space-y-1.5 p-6', props.class)}>
      <Slot />
    </div>
  );
});

const CardTitle = component$<PropsOf<'h3'>>((props) => {
  return (
    <h3 {...props} class={cn('font-semibold leading-none tracking-tight', props.class)}>
      <Slot />
    </h3>
  );
});

const CardDescription = component$<PropsOf<'p'>>((props) => {
  return (
    <p {...props} class={cn('text-muted-foreground text-sm', props.class)}>
      <Slot />
    </p>
  );
});

const CardContent = component$<PropsOf<'div'>>((props) => {
  return (
    <div {...props} class={cn('p-6 pt-0', props.class)}>
      <Slot />
    </div>
  );
});

const CardFooter = component$<PropsOf<'div'>>(({ ...props }) => {
  return (
    <div {...props} class={cn('flex items-center p-6 pt-0', props.class)}>
      <Slot />
    </div>
  );
});

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
