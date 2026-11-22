import { PropsOf, component$, useContext } from '@builder.io/qwik';
import { comboboxContextId } from './combobox-context';

type HiddenSelectOptionProps = {
  value: string;
  displayValue: string;
} & PropsOf<'option'>;

export const ComboboxHiddenSelectOption = component$(
  ({ value, displayValue, ...rest }: HiddenSelectOptionProps) => {
    const context = useContext(comboboxContextId);
    const selectedValues = context.selectedValuesSig.value;
    const isSelected = Array.isArray(selectedValues)
      ? selectedValues.includes(value)
      : selectedValues === value;

    return (
      <option value={value} selected={isSelected} {...rest}>
        {displayValue}
      </option>
    );
  },
);
