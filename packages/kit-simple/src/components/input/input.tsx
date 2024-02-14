import { component$, PropsOf } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';

type InputProps = PropsOf<'input'> & {
  error?: string;
};

export const Input = component$<InputProps>(({ name, error, ...props }) => {
  return (
    <>
      <input
        {...props}
        aria-errormessage={`${name}-error`}
        aria-invalid={!!error}
        class={cn(
          'border-input placeholder:text-muted-foreground focus-visible:ring-ring rounded-base flex h-9 w-full border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',

          props.class,
        )}
        id={name}
      />
      {error && (
        <div id={`${name}-error`} class="text-destructive mt-1 text-sm">
          {error}
        </div>
      )}
    </>
  );
});
