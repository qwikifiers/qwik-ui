import {
  PropsOf,
  Signal,
  component$,
  useContext,
  useSignal,
  useTask$,
} from '@builder.io/qwik';
import { isServer } from '@builder.io/qwik/build';
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

      const value = context.itemsMapSig.value.get(index)?.value;
      if (!value) {
        throw new Error(
          'Qwik UI: value not found when trying to select or unselect an item.',
        );
      }

      const selectedValues = context.selectedValuesSig.value;
      // MUST set .selected BEFORE dispatching the event so Modular Forms reads the updated state.
      optionRef.value.selected = Array.isArray(selectedValues)
        ? selectedValues.includes(value)
        : selectedValues === value;

      // Dispatch event on the last option only; top-down DOM execution ensures all options are updated.
      const isLastOption = index === context.itemsMapSig.value.size - 1;
      if (isLastOption) {
        const inputEvent = new Event('input', { bubbles: false });
        nativeSelectRef.value?.dispatchEvent(inputEvent);
      }
    });

    return (
      <option ref={optionRef} value={value} {...rest}>
        {displayValue}
      </option>
    );
  },
);
