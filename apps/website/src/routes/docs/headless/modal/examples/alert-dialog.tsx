import { component$ } from '@builder.io/qwik';
import { Modal } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <Modal.Root alert>
      <Modal.Trigger class="modal-trigger">Deactivate</Modal.Trigger>
      <Modal.Panel class="modal-panel">
        <Modal.Title>Deactive Account</Modal.Title>
        <Modal.Description>
          Are you sure you want to deactivate your account?
        </Modal.Description>
        <footer>
          <Modal.Close>Cancel</Modal.Close>
          <Modal.Close>Delete</Modal.Close>
        </footer>
        <Modal.Close class="modal-close">+</Modal.Close>
      </Modal.Panel>
    </Modal.Root>
  );
});
