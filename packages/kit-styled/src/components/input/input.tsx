import { $, component$, type PropsOf } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';

type InputProps = PropsOf<'input'> & {
  error?: string;
};

export const Input = component$<InputProps>(
  ({ name, error, id, ['bind:value']: bindSig, value, onInput$, ...props }) => {
    const inputId = id || name;

    return (
      <>
        <input
          {...props}
          aria-errormessage={`${inputId}-error`}
          aria-invalid={!!error}
          // workaround to support two way data-binding on the Input component (https://github.com/QwikDev/qwik/issues/3926)
          value={bindSig ? bindSig.value : value}
          onInput$={[bindSig && $((_, el) => (bindSig.value = el.value)), onInput$]}
          class={cn(
            'rounded-base flex h-12 w-full border border-input bg-background px-3 py-1 text-sm text-foreground shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
            props.class,
          )}
          id={inputId}
          name={name}
        />
        {error && (
          <div id={`${inputId}-error`} class="mt-1 text-sm text-alert">
            {error}
          </div>
        )}
      </>
    );
  },
);
