import { component$ } from '@builder.io/qwik';
import { Modal, ModalContent, ModalFooter, ModalHeader } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <Modal>
      <ModalHeader />
      <ModalContent />
      <ModalFooter />
    </Modal>
  );
});
