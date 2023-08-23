import { component$, useContext, type QwikIntrinsicElements } from '@builder.io/qwik';
import ComboboxContextId from './combobox-context-id';

export type ComboboxInputProps = QwikIntrinsicElements['input'];

// Add required context here
export const ComboboxInput = component$((props: ComboboxInputProps) => {
  const context = useContext(ComboboxContextId);

  return (
    <input
      ref={context.inputRef}
      type="text"
      onInput$={() => (context.isListboxOpenSig.value = true)}
      onKeyDown$={(e) => {
        if (e.key === 'ArrowDown') {
          context.isListboxOpenSig.value = true;
        }
      }}
      {...props}
    />
  );
});
