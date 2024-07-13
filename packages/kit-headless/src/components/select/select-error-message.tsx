import { PropsOf, Slot, component$, useContext } from '@builder.io/qwik';
import SelectContextId from './select-context';

export const HSelectErrorMessage = component$((props: PropsOf<'div'>) => {
  const context = useContext(SelectContextId);
  const errorMessageId = `${context.localId}-error-message`;

  return (
    <div role="alert" id={errorMessageId} {...props}>
      <Slot />
    </div>
  );
});
