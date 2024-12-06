import { PropsOf, Slot, component$, useContext, $ } from '@builder.io/qwik';
import { comboboxContextId } from './combobox-context';
import { Label } from '../label';
import { useCombinedRef } from '../../hooks/combined-refs';

type HComboboxLabelProps = PropsOf<'label'>;

export const HComboboxLabel = component$((props: HComboboxLabelProps) => {
  const context = useContext(comboboxContextId);
  const labelId = `${context.localId}-label`;
  const contextRefOpts = { context, givenContextRef: context.labelRef };
  const labelRef = useCombinedRef(props.ref, contextRefOpts);

  const handleClick$ = $(() => {
    context.inputRef.value?.focus();
  });

  return (
    <Label onClick$={handleClick$} id={labelId} ref={labelRef} {...props}>
      <Slot />
    </Label>
  );
});
