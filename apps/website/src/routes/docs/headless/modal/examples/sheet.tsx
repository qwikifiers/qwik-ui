import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Modal, Label } from '@qwik-ui/headless';
import styles from '../snippets/animation.css?inline';

export default component$(() => {
  useStyles$(styles);
  const isOpen = useSignal(false);

  return (
    <>
      <div class="modal-container">
        <button class="modal-trigger" onClick$={() => (isOpen.value = true)}>
          Open Modal
        </button>
        <Modal.Root class="modal sheet" bind:show={isOpen}>
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
        </Modal.Root>
      </div>
    </>
  );
});
