import { component$, useContext, type QwikIntrinsicElements } from '@builder.io/qwik';
import ComboboxContextId from './combobox-context-id';

export type ComboboxInputProps = QwikIntrinsicElements['input'];

// Add required context here
export const ComboboxInput = component$((props: ComboboxInputProps) => {
  const context = useContext(ComboboxContextId);

  return (
    <input
      onInput$={() => (context.isListboxOpenSig.value = true)}
      onBlur$={() => (context.isListboxOpenSig.value = false)}
      {...props}
    />
  );
});
