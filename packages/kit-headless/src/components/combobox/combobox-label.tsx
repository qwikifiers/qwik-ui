import { PropsOf, Slot, component$, useContext } from '@builder.io/qwik';
import { comboboxContextId } from './combobox-context';

type HComboboxLabelProps = PropsOf<'label'>;

export const HComboboxLabel = component$((props: HComboboxLabelProps) => {
  const context = useContext(comboboxContextId);

  return (
    <label ref={context.labelRef} {...props}>
      <Slot />
    </label>
  );
});
