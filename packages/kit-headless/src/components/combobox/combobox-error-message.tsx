import { PropsOf, Slot, component$, useContext } from '@builder.io/qwik';
import { comboboxContextId } from './combobox-context';

type HComboboxErrorMessageProps = PropsOf<'div'>;

export const HComboboxErrorMessage = component$((props: HComboboxErrorMessageProps) => {
  const context = useContext(comboboxContextId);
  const errorMessageId = `${context.localId}-error-message`;

  return (
    <div role="alert" id={errorMessageId} {...props}>
      <Slot />
    </div>
  );
});
