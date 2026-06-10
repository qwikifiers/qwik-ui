import {
  PropsOf,
  Signal,
  component$,
  useContext,
  useSignal,
  useTask$,
} from '@qwik.dev/core';
import { isServer } from '@qwik.dev/core/build';
import { comboboxContextId } from './combobox-context';

type HiddenSelectOptionProps = {
  value: string;
  displayValue: string;
  nativeSelectRef: Signal<HTMLSelectElement | undefined>;
  index: number;
} & PropsOf<'option'>;

export const ComboboxHiddenSelectOption = component$(
  ({ value, displayValue, nativeSelectRef, index, ...rest }: HiddenSelectOptionProps) => {
    const optionRef = useSignal<HTMLOptionElement>();
    const context = useContext(comboboxContextId);

    useTask$(async function modularFormsValidation({ track }) {
      track(() => context.selectedValuesSig.value);

      if (isServer || !nativeSelectRef.value || !optionRef.value) return;

      // modular forms expects the input event fired after interaction
      const inputEvent = new Event('input', { bubbles: false });
      nativeSelectRef.value?.dispatchEvent(inputEvent);

      // make sure to programmatically select the option after the input event has fired
      const value = context.itemsMapSig.value.get(index)?.value;
      if (!value) {
        throw new Error(
          'Qwik UI: value not found when trying to select or unselect an item.',
        );
      }

      const selectedValues = context.selectedValuesSig.value;
      optionRef.value.selected = Array.isArray(selectedValues)
        ? selectedValues.includes(value)
        : selectedValues === value;
    });

    return (
      <option ref={optionRef} value={value} {...rest}>
        {displayValue}
      </option>
    );
  },
);
