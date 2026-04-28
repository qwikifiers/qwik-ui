import { PropsOf, Slot, component$, useContext } from '@qwik.dev/core';
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
