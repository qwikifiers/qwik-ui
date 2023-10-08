import { $, Slot, component$, useContext, useOn } from '@builder.io/qwik';
import { modalContextId } from './modal-context-id';

export const ModalClose = component$(() => {
  const modalContext = useContext(modalContextId);

  useOn(
    'click',
    $(function closeModal() {
      modalContext.showSig.value = false;
    }),
  );

  return (
    <div>
      <Slot />
    </div>
  );
});
