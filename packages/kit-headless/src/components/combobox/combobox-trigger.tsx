import {
  component$,
  Slot,
  type QwikIntrinsicElements,
  useContext,
  useTask$,
  useSignal,
  useVisibleTask$,
  QwikMouseEvent
} from '@builder.io/qwik';
import ComboboxContextId, { ComboboxControlContextId } from './combobox-context-id';
// import { PopupManagerContext } from '../popup-manager';
import { PopupManagerContext } from '../popup-manager';
import { ComboboxListbox } from './combobox-listbox';
import { isServer } from '@builder.io/qwik/build';

import { KeyCode } from '../../utils/key-code.type';

export type ComboboxTriggerProps = QwikIntrinsicElements['button'];

export const ComboboxTrigger = component$(({ ...props }: ComboboxTriggerProps) => {
  console.log('Render: ComboboxTrigger');
  const context = useContext(ComboboxContextId);
  const controlContext = useContext(ComboboxControlContextId);
  const popupManager = useContext(PopupManagerContext);
  const triggerRef = useSignal<HTMLButtonElement>();
  controlContext.triggerRef = triggerRef;

  // wanted to see if it worked with async
  useTask$(async () => {
    console.log('Show');
    await popupManager.show(
      <>
        <div>hi</div>
        <div>there!</div>
        <div>{context.isListboxOpenSig.value}</div>
      </>
    );
  });

  // useTask$(({ track }) => {
  //   track(() => triggerRef.value?.focus());
  //   console.log(context.isTriggerFocusedSig.value);

  //   if (context.isTriggerFocusedSig.value) {
  //     triggerRef.value?.focus();
  //   }
  // });

  return (
    <>
      <button
        ref={triggerRef}
        onMouseDown$={async () => {
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
