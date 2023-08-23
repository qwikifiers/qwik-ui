import {
  Slot,
  component$,
  useContext,
  type QwikIntrinsicElements
} from '@builder.io/qwik';
import ComboboxContextId from './combobox-context-id';

export type ComboboxTriggerProps = QwikIntrinsicElements['button'];

export const ComboboxTrigger = component$(({ ...props }: ComboboxTriggerProps) => {
  const context = useContext(ComboboxContextId);

  return (
    <>
      <button
        ref={context.triggerRef}
        onMouseDown$={() => {
          context.isListboxOpenSig.value = !context.isListboxOpenSig.value;
          context.isInputFocusedSig.value = true;
        }}
        tabIndex={-1}
        aria-expanded={context.isListboxOpenSig.value}
        {...props}
      >
        <Slot />
      </button>
    </>
  );
});
