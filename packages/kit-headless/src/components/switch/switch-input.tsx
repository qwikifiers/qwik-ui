
import { component$, PropsOf, sync$, useContext, useId, $ } from '@builder.io/qwik';
import { SwitchContext } from './switch-context';
export const SwitchInput = component$<PropsOf<'input'>>(() => {
    const context = useContext(SwitchContext)
    const id = useId()
    if(context.defaultChecked && context.bindChecked && !context.bindChecked.value){
      context.bindChecked.value = !context.bindChecked.value
    }

    if(context.autoFocus && !context.switchRef?.value){
      context.switchRef?.value?.focus()
    }

    const handleClick$ = $((e: MouseEvent | KeyboardEvent) => {
      context.switchRef?.value?.focus()
      context.bindChecked.value = !context.bindChecked.value;
      if(context.onChange$){
        context.onChange$(context.bindChecked.value, e)
      }

      if(context.onClick$){
        context.onClick$(context.bindChecked.value, e)
      }

    });
    const handleClickSync$ = sync$((e: MouseEvent) => {
      e.preventDefault();
    });
    return (
      <input
        data-checked={context.bindChecked?.value ? 'true' : 'false'}
        data-disabled={context.disabled ? 'true' : 'false'}
        ref={context.switchRef}
        aria-describedby={`${id}-switch`}
        disabled={context.disabled}
        aria-checked={context.bindChecked ? 'true' : 'false'}
        type="checkbox"
        role="switch"
        data-value
        onClick$={[handleClickSync$, handleClick$]}
        checked={context.bindChecked?.value}
        onChange$={[handleClickSync$,handleClick$]}
        onKeyPress$={handleClick$}
      />
    );
  },
);
