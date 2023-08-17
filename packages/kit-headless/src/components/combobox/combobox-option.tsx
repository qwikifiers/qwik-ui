import {
  QwikIntrinsicElements,
  Slot,
  component$,
  useContext,
  useComputed$
} from '@builder.io/qwik';
import ComboboxContextId from './combobox-context-id';

export type ComboboxOptionProps = {
  value?:
    | string
    | {
        value: string;
        label: string;
        disabled?: boolean;
      };
} & QwikIntrinsicElements['li'];

export const ComboboxOption = component$((props: ComboboxOptionProps) => {
  const index = (props as ComboboxOptionProps & { _index: number })._index;
  const context = useContext(ComboboxContextId);
  const selectedOptionIndexSig = context.selectedOptionIndexSig;

  const computedStyle = useComputed$(() => {
    return index === selectedOptionIndexSig.value
      ? { border: '2px solid maroon' }
      : { border: '2px solid transparent' };
  });

  return (
    <li
      {...props}
      style={computedStyle.value}
      onClick$={() => {
        selectedOptionIndexSig.value = index;
      }}
    >
      <Slot />
    </li>
  );
});
