import { component$, useSignal } from '@builder.io/qwik';
import { Modal, ModalDescription, ModalTitle } from '@qwik-ui/headless';

export default component$(() => {
  const isOpen = useSignal(false);

  return (
    <Modal.Root bind:show={isOpen}>
      <Modal.Title>Accessible Name</Modal.Title>
      <Modal.Description>Optional Description</Modal.Description>
      {/* other content */}
    </Modal.Root>
  );
});
