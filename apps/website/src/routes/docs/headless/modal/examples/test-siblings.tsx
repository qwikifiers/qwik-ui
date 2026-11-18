import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Modal } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);
  const isFirstOpen = useSignal(false);
  const isSecondOpen = useSignal(false);

  return (
    <>
      <button onClick$={() => (isFirstOpen.value = true)} class="modal-trigger">
        Open Modal
      </button>
      <Modal.Root bind:show={isFirstOpen}>
        <Modal.Panel class="modal-panel">
          <Modal.Title>First</Modal.Title>
          <button onClick$={() => (isSecondOpen.value = true)}>Open second</button>
          <Modal.Close class="modal-close">Close first</Modal.Close>
        </Modal.Panel>
      </Modal.Root>
      <Modal.Root bind:show={isSecondOpen}>
        <Modal.Panel class="modal-panel">
          <Modal.Title>Second</Modal.Title>
          <Modal.Close class="modal-close">Close second</Modal.Close>
        </Modal.Panel>
      </Modal.Root>
    </>
  );
});

// internal
import styles from '../snippets/modal.css?inline';
