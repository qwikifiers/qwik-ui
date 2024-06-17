import { PropsOf, Slot, component$, useContext } from '@builder.io/qwik';
import { comboboxItemContextId } from './combobox-context';

type HComboboxItemIndicatorProps = PropsOf<'span'>;

export const HComboboxItemIndicator = component$((props: HComboboxItemIndicatorProps) => {
  const itemContext = useContext(comboboxItemContextId);

  return (
    <span aria-hidden="true" {...props}>
      {itemContext.isSelectedSig.value && <Slot />}
    </span>
  );
});
