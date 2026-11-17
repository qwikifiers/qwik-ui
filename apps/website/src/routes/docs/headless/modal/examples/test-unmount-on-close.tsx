import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Modal } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);
  useStyles$(`
    .test-fade { animation: fadeOut 0.3s forwards; }
    .test-fade[data-open] { animation: fadeIn 0.3s forwards; }
    @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
    @keyframes fadeOut { from { opacity: 1 } to { opacity: 0 } }
  `);
  const isOpen = useSignal(false);
  const isMounted = useSignal(true);
  const outsideClicks = useSignal(0);
  const dialogStateOnClose = useSignal('not called');

  return (
    <>
      <button onClick$={() => (isOpen.value = true)} class="modal-trigger">
        Open Modal
      </button>
      <button onClick$={() => outsideClicks.value++}>
        outside clicks: {outsideClicks.value}
      </button>
      <p data-testid="dialog-state">dialog on close: {dialogStateOnClose.value}</p>
      {isMounted.value && (
        <Modal.Root
          bind:show={isOpen}
          onClose$={() => {
            const dialog = document.querySelector('dialog');
            dialogStateOnClose.value = dialog?.open ? 'open' : 'closed';
            isMounted.value = false;
          }}
        >
          <Modal.Panel class="modal-panel test-fade">
            <Modal.Title>Unmount on close</Modal.Title>
            <Modal.Close class="modal-close">Close</Modal.Close>
          </Modal.Panel>
        </Modal.Root>
      )}
    </>
  );
});

// internal
import styles from '../snippets/modal.css?inline';
