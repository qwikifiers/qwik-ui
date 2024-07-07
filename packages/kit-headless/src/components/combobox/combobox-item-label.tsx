import { PropsOf, Slot, component$, useContext } from '@builder.io/qwik';
import { comboboxItemContextId } from './combobox-context';

type HComboboxItemLabelProps = PropsOf<'span'> & {
  _value: string;
  _displayValue: string;
  _disabled: boolean;
};

export const HComboboxItemLabel = component$(
  ({ _value, _displayValue, _disabled, ...props }: HComboboxItemLabelProps) => {
    const itemContext = useContext(comboboxItemContextId);

    return (
      <span tabIndex={-1} id={itemContext.itemLabelId} {...props}>
        <Slot />
      </span>
    );
  },
);
