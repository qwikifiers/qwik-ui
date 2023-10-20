import { component$, useSignal } from '@builder.io/qwik';
import { Modal, ModalContent, ModalFooter, ModalHeader } from '@qwik-ui/headless';

export default component$(() => {
  const showSig = useSignal(false);

  return (
    <Modal bind:show={showSig}>
      <ModalHeader />
      <ModalContent />
      <ModalFooter />
    </Modal>
  );
});
