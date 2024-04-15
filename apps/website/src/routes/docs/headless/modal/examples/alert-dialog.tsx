import { component$, useSignal } from '@builder.io/qwik';
import { Modal, ModalTitle, ModalDescription } from '@qwik-ui/headless';

export default component$(() => {
  const showSig = useSignal(false);

  return (
    <>
      <button class="modal-trigger" onClick$={() => (showSig.value = true)}>
        Deactivate
      </button>
      <Modal alert class="modal" bind:show={showSig}>
        <ModalTitle>Deactive Account</ModalTitle>
        <ModalDescription>
          Are you sure you want to deactivate your account?
        </ModalDescription>
        <footer>
          <button onClick$={() => (showSig.value = false)}>Cancel</button>
          <button onClick$={() => (showSig.value = false)}>Delete</button>
        </footer>
        <button class="modal-close" onClick$={() => (showSig.value = false)}>
          +
        </button>
      </Modal>
    </>
  );
});
