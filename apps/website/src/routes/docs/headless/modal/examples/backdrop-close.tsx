import { component$, useStyles$ } from '@qwik.dev/core';
import { Modal, Label } from '@qwik-ui/headless';
import styles from '../snippets/modal.css?inline';

export default component$(() => {
  useStyles$(styles);

  return (
    <Modal.Root closeOnBackdropClick={false}>
      <Modal.Trigger class="modal-trigger">Open Modal</Modal.Trigger>
      <Modal.Panel class="modal-panel">
        <Modal.Title>Edit Profile</Modal.Title>
        <Modal.Description>
          You can update your profile here. Hit the save button when finished.
        </Modal.Description>
        <Label>
          Name
          <input type="text" placeholder="John Doe" />
        </Label>
        <Label>
          Email
          <input type="text" placeholder="johndoe@gmail.com" />
        </Label>
        <footer>
          <Modal.Close class="modal-close">Cancel</Modal.Close>
          <Modal.Close class="modal-close">Save Changes</Modal.Close>
        </footer>
      </Modal.Panel>
    </Modal.Root>
  );
});
