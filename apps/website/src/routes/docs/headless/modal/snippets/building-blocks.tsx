import { component$, useSignal } from '@builder.io/qwik';
import { Modal, ModalDescription, ModalTitle } from '@qwik-ui/headless';

export default component$(() => {
  const isOpen = useSignal(false);

  return (
    <Modal bind:show={isOpen}>
      <ModalTitle>Accessible Name</ModalTitle>
      <ModalDescription>Optional Description</ModalDescription>
      {/* other content */}
    </Modal>
  );
});
