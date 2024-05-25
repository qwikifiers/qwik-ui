import { PropsOf, component$ } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';

export const Checkbox = component$<PropsOf<'input'>>(({ id, name, ...props }) => {
  const inputId = id || name;
  return (
    <input
      type="checkbox"
      {...props}
      class={cn(
        'peer peer h-4 w-4 shrink-0 border-primary text-primary accent-primary ring-offset-background focus:ring-ring focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
        props.class,
      )}
      id={inputId}
    />
  );
});
