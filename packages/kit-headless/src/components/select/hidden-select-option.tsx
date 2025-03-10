import {
  PropsOf,
  Signal,
  component$,
  useContext,
  useSignal,
  useTask$,
} from '@qwik.dev/core';
import { isServer } from '@qwik.dev/core/build';
import SelectContextId from './select-context';

type HiddenSelectOptionProps = {
  value: string;
  displayValue: string;
  nativeSelectRef: Signal<HTMLSelectElement | undefined>;
  index: number;
} & PropsOf<'option'>;

export const HiddenSelectOption = component$(
  ({ value, displayValue, nativeSelectRef, index, ...rest }: HiddenSelectOptionProps) => {
    const optionRef = useSignal<HTMLOptionElement>();
    const context = useContext(SelectContextId);

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
