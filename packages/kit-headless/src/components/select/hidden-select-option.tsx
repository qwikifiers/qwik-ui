import { PropsOf, component$, useContext } from '@builder.io/qwik';
import SelectContextId from './select-context';

type HiddenSelectOptionProps = {
  value: string;
  displayValue: string;
  index: number;
} & PropsOf<'option'>;

export const HiddenSelectOption = component$(
  ({ value, displayValue, index, ...rest }: HiddenSelectOptionProps) => {
    const context = useContext(SelectContextId);

    return (
      <option
        value={value}
        selected={context.selectedIndexSetSig.value.has(index)}
        {...rest}
      >
        {displayValue}
      </option>
    );
  },
);
