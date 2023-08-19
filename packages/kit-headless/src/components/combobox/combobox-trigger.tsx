import {
  component$,
  Slot,
  type QwikIntrinsicElements,
  useContext
} from '@builder.io/qwik';
import ComboboxContextId, { ComboboxControlContextId } from './combobox-context-id';

export type ComboboxTriggerProps = QwikIntrinsicElements['button'];

export const ComboboxTrigger = component$(({ ...props }: ComboboxTriggerProps) => {
  const context = useContext(ComboboxContextId);
  const controlContext = useContext(ComboboxControlContextId);

  return (
    <>
      <button
        ref={controlContext.triggerRef}
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
