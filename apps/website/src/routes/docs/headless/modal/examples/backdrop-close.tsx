import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Modal, Label } from '@qwik-ui/headless';
import styles from '../snippets/modal.css?inline';

export default component$(() => {
  useStyles$(styles);
  const isOpen = useSignal(false);

  return (
    <Modal.Root closeOnBackdropClick={false} bind:show={isOpen}>
      <Modal.Trigger class="modal-trigger" onClick$={() => (isOpen.value = true)}>
        Open Modal
      </Modal.Trigger>
      <Modal.Panel class="modal">
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
          <button onClick$={() => (isOpen.value = false)}>Cancel</button>
          <button onClick$={() => (isOpen.value = false)}>Save Changes</button>
        </footer>
      </Modal.Panel>
    </Modal.Root>
  );
});
