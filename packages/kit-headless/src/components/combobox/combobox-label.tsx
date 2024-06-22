import { PropsOf, Slot, component$, useContext, $ } from '@builder.io/qwik';
import { comboboxContextId } from './combobox-context';
import { Label } from '../label';

type HComboboxLabelProps = PropsOf<'label'>;

export const HComboboxLabel = component$((props: HComboboxLabelProps) => {
  const context = useContext(comboboxContextId);
  const labelId = `${context.localId}-label`;

  const handleClick$ = $(() => {
    context.inputRef.value?.focus();
  });

  return (
    <Label onClick$={handleClick$} id={labelId} ref={context.labelRef} {...props}>
      <Slot />
    </Label>
  );
});
