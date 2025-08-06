import { $, type PropsOf, component$ } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';

export const Checkbox = component$<Partial<PropsOf<'input'> & { type?: 'checkbox' }>>(
  ({ id, name, ['bind:checked']: bindSig, checked, onInput$, ...props }) => {
    const inputId = id || name;
    return (
      <input
        {...props}
        type="checkbox"
        // workaround to support two way data-binding on the Input component (https://github.com/QwikDev/qwik/issues/3926)
        checked={bindSig ? bindSig.value : checked}
        onInput$={[bindSig && $((_, el) => (bindSig.value = el.checked)), onInput$]}
        data-checked={checked || bindSig?.value || ''}
        class={cn(
          'peer h-4 w-4 shrink-0 border-primary text-primary accent-primary ring-offset-background focus:ring-ring focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          props.class,
        )}
        id={inputId}
        name={name}
      />
    );
  },
);
