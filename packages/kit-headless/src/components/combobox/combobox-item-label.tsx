import { PropsOf, Slot, component$, useContext } from '@builder.io/qwik';
import { comboboxItemContextId } from './combobox-context';

type HComboboxItemLabelProps = PropsOf<'span'>;

export const HComboboxItemLabel = component$(({ ...props }: HComboboxItemLabelProps) => {
  const itemContext = useContext(comboboxItemContextId);

  return (
    <span tabIndex={-1} id={itemContext.itemLabelId} {...props}>
      <Slot />
    </span>
  );
});
