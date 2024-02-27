import { component$, type PropsOf } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';

type InputProps = PropsOf<'input'> & {
  error?: string;
};

export const Input = component$<InputProps>(
  ({
    name,
    error,
    'bind:value': valueSig,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'bind:checked': checkedSig,
    ...props
  }) => {
    return (
      <>
        <input
          {...props}
          aria-errormessage={`${name}-error`}
          aria-invalid={!!error}
          bind:value={valueSig}
          class={cn(
            'rounded-base border-input placeholder:text-muted-foreground focus-visible:ring-ring bg-background text-foreground file:text-foreground flex h-12 w-full border px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
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
  },
);
