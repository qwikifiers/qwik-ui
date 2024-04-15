import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Modal, ModalTitle, ModalDescription } from '@qwik-ui/headless';
import styles from '../snippets/modal.css?inline';

export default component$(() => {
  useStyles$(styles);
  const isOpen = useSignal(false);

  return (
    <>
      <button class="modal-trigger" onClick$={() => (isOpen.value = true)}>
        Open Modal
      </button>
      <Modal class="modal" bind:show={isOpen}>
        <ModalTitle>Edit Profile</ModalTitle>
        <ModalDescription>
          You can update your profile here. Hit the save button when finished.
        </ModalDescription>
        <label for="name">Name</label>
        <input
          class="mt-2 rounded-base bg-background px-4 py-[10px] text-foreground"
          id="name"
          type="text"
          placeholder="John Doe"
        />
        <label for="email">Email</label>
        <input id="email" type="text" placeholder="johndoe@gmail.com" />
        <footer>
          <button onClick$={() => (isOpen.value = false)}>Cancel</button>
          <button onClick$={() => (isOpen.value = false)}>Save Changes</button>
        </footer>
        <button
          onClick$={() => (isOpen.value = false)}
          class="absolute right-6 top-[26px]"
        >
          Close
        </button>
      </Modal>
    </>
  );
});
