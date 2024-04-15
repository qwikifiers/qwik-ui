import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Modal, ModalTitle, ModalDescription, Label } from '@qwik-ui/headless';
import styles from '../snippets/modal.css?inline';

export default component$(() => {
  useStyles$(styles);
  const isOpen = useSignal(false);

  return (
    <div class="modal-container">
      <button class="modal-trigger" onClick$={() => (isOpen.value = true)}>
        Open Modal
      </button>
      <Modal class="modal modal-backdrop" bind:show={isOpen}>
        <ModalTitle>Edit Profile</ModalTitle>
        <ModalDescription>
          You can update your profile here. Hit the save button when finished.
        </ModalDescription>
        <Label>
          Name
          <input type="text" placeholder="John Doe" />
        </Label>
        <Label>
          Email
          <input type="text" placeholder="johndoe@gmail.com" />
        </Label>
        <footer>
          <button onClick$={() => (isOpen.value = false)}>Cancel</button>
          <button onClick$={() => (isOpen.value = false)}>Save Changes</button>
        </footer>
      </Modal>
    </div>
  );
});
