
import { component$, PropsOf, sync$, useContext, useId, $ } from '@builder.io/qwik';
import { SwitchContext } from './switch-context';
export const SwitchInput = component$<PropsOf<'input'>>(() => {
    const context = useContext(SwitchContext)
    const id = useId()
    if(context.defaultChecked && context.bindChecked && !context.bindChecked.value){
      context.bindChecked.value = true
    }

    if(context.autoFocus && !context.switchRef?.value){
      context.switchRef?.value?.focus()
    }


    const handleKeyDownSync$ = sync$((e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault();
      }
    });

    const handleKeyDown$ = $((e: KeyboardEvent) => {
      if (e.key === ' ') {
        context.bindChecked.value = !context.bindChecked.value;
      }
    });

    const handleClick$ = $((e: MouseEvent | KeyboardEvent) => {
      context.bindChecked.value = !context.bindChecked.value;
      if(context.onChange$){
        context.onChange$(context.bindChecked.value, e)
      }

      if(context.onClick$){
        context.onClick$(context.bindChecked.value, e)
      }

    });

    return (
      <input
        data-checked={context.bindChecked?.value ? '' : undefined}
        data-disabled={context.disabled ? '' : undefined}
        ref={context.switchRef}
        aria-describedby={`${id}-switch`}
        disabled={context.disabled}
        aria-checked={context.bindChecked ? 'true' : 'false'}
        type="checkbox"
        role="switch"
        onClick$={handleClick$}
        checked={context.bindChecked?.value}
        onChange$={handleClick$}
        onKeyDown$={[handleKeyDownSync$, handleKeyDown$]}
        onKeyPress$={handleClick$}
      />
    );
  },
);
