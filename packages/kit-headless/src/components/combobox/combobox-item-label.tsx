import { PropsOf, Slot, component$, useContext, useTask$ } from '@builder.io/qwik';
import { comboboxContextId, comboboxItemContextId } from './combobox-context';

type HComboboxItemLabelProps = PropsOf<'span'> & {
  _value: string;
  _displayValue: string;
  _disabled: boolean;
};

export const HComboboxItemLabel = component$(
  ({ _value, _displayValue, _disabled, ...props }: HComboboxItemLabelProps) => {
    const itemContext = useContext(comboboxItemContextId);
    const context = useContext(comboboxContextId);

    useTask$(({ track }) => {
      track(() => context.inputValueSig.value);

      context.itemsMapSig.value.set(itemContext._index ?? -1, {
        value: _value,
        displayValue: _displayValue,
        disabled: _disabled,
      });
    });

    useTask$(({ track, cleanup }) => {
      track(() => context.inputValueSig.value);

      context.itemsMapSig.value.set(itemContext._index ?? -1, {
        value: _value,
        displayValue: _displayValue,
        disabled: _disabled,
      });

      cleanup(() => {
        const newMap = new Map(context.itemsMapSig.value);
        newMap.delete(itemContext._index ?? -1);
        context.itemsMapSig.value = newMap;
      });
    });

    return (
      <span tabIndex={-1} id={itemContext.itemLabelId} {...props}>
        <Slot />
      </span>
    );
  },
);
