import { PropsOf, Slot, component$ } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';

export const RadioGroup = component$<PropsOf<'div'>>(({ ...props }) => {
  return (
    <div class={cn('grid gap-2', props.class)} {...props}>
      <Slot />
    </div>
  );
});

export const RadioGroupItem = component$<PropsOf<'input'>>(({ ...props }) => {
  return (
    <input
      type="radio"
      {...props}
      class={cn(
        'accent-primary h-4 w-4 disabled:cursor-not-allowed disabled:opacity-50',
        props.class,
      )}
    />
  );
});
