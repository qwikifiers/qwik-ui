import { QwikIntrinsicElements, Slot, component$, useContext } from '@builder.io/qwik';
import { modalContextId } from './modal-context-id';

export type ModalTriggerProps = QwikIntrinsicElements['button'];

export const ModalTrigger = component$((props: ModalTriggerProps) => {
  const modalContext = useContext(modalContextId);

  return (
    <button onClick$={() => (modalContext.showSig.value = true)} {...props}>
      <Slot />
    </button>
  );
});
