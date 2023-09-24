import {
  Slot,
  component$,
  useContext,
  $,
  type QwikIntrinsicElements,
} from '@builder.io/qwik';
import ComboboxContextId from './combobox-context-id';

export type ComboboxTriggerProps = QwikIntrinsicElements['button'];

export const ComboboxTrigger = component$((props: ComboboxTriggerProps) => {
  const context = useContext(ComboboxContextId);
  const listboxId = `${context.localId}-listbox`;

  return (
    <>
      <button
        {...props}
        ref={context.triggerRef}
        onMouseDown$={[
          $(() => {
            context.isListboxOpenSig.value = !context.isListboxOpenSig.value;
          }),
          props.onMouseDown$,
        ]}
        tabIndex={-1}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        aria-expanded={context.isListboxOpenSig.value}
        aria-label="Show suggestions"
      >
        <Slot />
      </button>
    </>
  );
});
