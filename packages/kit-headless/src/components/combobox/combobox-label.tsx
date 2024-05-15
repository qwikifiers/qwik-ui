import { PropsOf, Slot, component$, useContext } from '@builder.io/qwik';
import { HLabel } from '../label/label';
import ComboboxContextId from './combobox-context-id';

export type ComboboxLabelProps = PropsOf<'label'>;

export const HComboboxLabel = component$((props: ComboboxLabelProps) => {
  const context = useContext(ComboboxContextId);
  const inputId = `${context.localId}-input`;

  return (
    <HLabel {...props} for={inputId} ref={context.labelRef}>
      <Slot />
    </HLabel>
  );
});
