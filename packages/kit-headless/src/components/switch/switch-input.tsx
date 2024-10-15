
import { component$, PropsOf, useContext, useId } from '@builder.io/qwik';
import { SwitchContext } from './switch-context';
export const SwitchInput = component$<PropsOf<'input'>>(() => {
    const context = useContext(SwitchContext)
    const id = useId()

    if(context.defaultChecked && context.bindChecked && !context.bindChecked.value){
      context.bindChecked.value = true
    }

    return (
      <input
        aria-describedby={`${id}-switch`}
        disabled={context.disabled}
        aria-checked={context.bindChecked ? 'true' : 'false'}
        type="checkbox"
        role="switch"
        checked={context.bindChecked?.value}
        onChange$={context.onChange$}
      />
    );
  },
);
