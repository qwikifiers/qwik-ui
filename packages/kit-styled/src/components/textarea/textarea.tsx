import { $, component$, type PropsOf } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';

type TextareaProps = PropsOf<'textarea'> & {
  error?: string;
};

export const Textarea = component$<TextareaProps>(
  ({ id, name, error, ['bind:value']: bindSig, value, onInput$, ...props }) => {
    const textareaId = id || name;
    return (
      <>
        <textarea
          {...props}
          // workaround to support two way data-binding on the Input component (https://github.com/QwikDev/qwik/issues/3926)
          value={bindSig ? bindSig.value : value}
          onInput$={[bindSig && $((_, el) => (bindSig.value = el.value)), onInput$]}
          class={cn(
            '[&::-webkit-scrollbar-track]:bg-blue border-input placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[60px] w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:ring-1 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
            props.class,
          )}
          id={textareaId}
          name={name}
        />
        {error && <div id={`${textareaId}-error`}>{error}</div>}
      </>
    );
  },
);
