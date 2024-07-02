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
      track(() => context.selectedIndexSetSig.value);

      if (isServer || !nativeSelectRef.value || !optionRef.value) return;

      // modular forms expects the input event fired after interaction
      const inputEvent = new Event('input', { bubbles: false });
      nativeSelectRef.value?.dispatchEvent(inputEvent);

      // make sure to programmatically select the option after the input event has fired
      optionRef.value.selected = context.selectedIndexSetSig.value.has(index);
    });

    return (
      <option ref={optionRef} value={value} {...rest}>
        {displayValue}
      </option>
    );
  },
);
