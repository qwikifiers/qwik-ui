import {
  component$,
  Slot,
  type QwikIntrinsicElements,
  useContext,
  useTask$
} from '@builder.io/qwik';
import ComboboxContextId from './combobox-context-id';
// import { PopupManagerContext } from '../popup-manager';
import { PopupManagerContext } from '../popup-manager';
import { isServer } from '@builder.io/qwik/build';

export type ComboboxTriggerProps = QwikIntrinsicElements['button'];

export const ComboboxTrigger = component$(({ ...props }: ComboboxTriggerProps) => {
  const context = useContext(ComboboxContextId);
  const popupManager = useContext(PopupManagerContext);

  useTask$(() => {
    if (isServer) {
      popupManager.show(<div>I'm a div!</div>);
    }
  });
  return (
    <>
      <button
        onClick$={async () => {
          await popupManager.show(<div>I'm a div!</div>);
          context.isListboxOpenSig.value = !context.isListboxOpenSig.value;
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
