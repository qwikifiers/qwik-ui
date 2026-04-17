import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Modal } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);
  const isOpen = useSignal(false);
  const showCount = useSignal(0);
  const closeCount = useSignal(0);

  return (
    <>
      <button onClick$={() => (isOpen.value = true)} class="modal-trigger">
        Open Modal
      </button>
      <p data-testid="show-count">onShow count: {showCount.value}</p>
      <p data-testid="close-count">onClose count: {closeCount.value}</p>
      <Modal.Root
        bind:show={isOpen}
        onShow$={() => showCount.value++}
        onClose$={() => closeCount.value++}
      >
        <Modal.Panel class="modal-panel">
          <Modal.Title>Callback Test Modal</Modal.Title>
          <Modal.Close class="modal-close">Close</Modal.Close>
        </Modal.Panel>
      </Modal.Root>
    </>
  );
});

// internal
import styles from '../snippets/modal.css?inline';
