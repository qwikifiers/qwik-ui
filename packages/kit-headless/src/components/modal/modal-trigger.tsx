import { $, Slot, component$, useContext, useOn } from '@builder.io/qwik';
import { modalContextId } from './modal-context-id';

export const ModalTrigger = component$(() => {
  const modalContext = useContext(modalContextId);

  useOn(
    'click',
    $(function openModal() {
      modalContext.showSig.value = true;
    }),
  );

  return (
    <div>
      <Slot />
    </div>
  );
});
