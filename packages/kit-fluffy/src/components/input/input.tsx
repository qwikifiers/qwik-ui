import { PropsOf, component$ } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';

export type InputProps = PropsOf<'input'>;

export const Input = component$<InputProps>(({ ...props }) => {
  return (
    <input
      {...props}
      class={cn(
        'border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring rounded-base flex h-10 w-full border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        props.class,
      )}
    />
  );
});
