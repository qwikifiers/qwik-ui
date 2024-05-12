import { PropsOf, Slot, component$, useContext } from '@builder.io/qwik';
import { Label } from '../label/label';
import ComboboxContextId from './combobox-context-id';

export type ComboboxLabelProps = PropsOf<'label'>;

export const ComboboxLabel = component$((props: ComboboxLabelProps) => {
  const context = useContext(ComboboxContextId);
  const inputId = `${context.localId}-input`;

  return (
    <Label {...props} for={inputId} ref={context.labelRef}>
      <Slot />
    </Label>
  );
});
