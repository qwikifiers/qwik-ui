import {
  PropsOf,
  Signal,
  component$,
  useContext,
  useSignal,
  useTask$,
} from '@builder.io/qwik';
import { isServer } from '@builder.io/qwik/build';
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

      // MUST set .selected BEFORE dispatching the event so Modular Forms reads the updated state.
      optionRef.value.selected = context.selectedIndexSetSig.value.has(index);

      // Dispatch event on the last option only; top-down DOM execution ensures all options are updated.
      if (index === context.itemsMapSig.value.size - 1) {
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
