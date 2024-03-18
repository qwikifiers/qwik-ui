import { PropsOf, component$ } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';

export const Checkbox = component$<PropsOf<'input'>>(({ name, ...props }) => {
  return (
    <input
      type="checkbox"
      {...props}
      class={cn(
        'border-primary accent-primary text-primary ring-offset-background focus:ring-ring focus-visible:ring-ring data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground peer peer h-4 w-4 shrink-0 disabled:cursor-not-allowed disabled:opacity-50',
        props.class,
      )}
      name={name}
      id={name}
    />
  );
});
