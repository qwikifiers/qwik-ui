
import { component$, PropsOf, useContext } from '@builder.io/qwik';
import { SwitchContext } from './switch-context';
export const SwitchInput = component$<PropsOf<'input'>>(() => {
    const context = useContext(SwitchContext)
    return (
      <input
        type="checkbox"
			  role="switch"
        onChange$={context.onChange$}
      />
    );
  },
);
