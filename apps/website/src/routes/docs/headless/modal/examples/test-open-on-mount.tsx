import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Modal } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);
  const isMounted = useSignal(false);
  const isOpen = useSignal(true);

  return (
    <>
      <button onClick$={() => (isMounted.value = true)} class="modal-trigger">
        Mount Modal
      </button>
      {isMounted.value && (
        <Modal.Root bind:show={isOpen}>
          <Modal.Panel class="modal-panel">
            <Modal.Title>Open on mount</Modal.Title>
            <Modal.Close class="modal-close">Close</Modal.Close>
          </Modal.Panel>
        </Modal.Root>
      )}
    </>
  );
});

// internal
import styles from '../snippets/modal.css?inline';
