import { QwikIntrinsicElements, Slot, component$, useContext } from '@builder.io/qwik';
import { modalContextId } from './modal-context-id';

type ModalCloseProps = QwikIntrinsicElements['button'];

export const ModalClose = component$((props: ModalCloseProps) => {
  const modalContext = useContext(modalContextId);

  return (
    <button onClick$={() => (modalContext.showSig.value = false)} {...props}>
      <Slot />
    </button>
  );
});
