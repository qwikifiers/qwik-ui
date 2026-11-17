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
  const showCount = useSignal(0);
  const closeCount = useSignal(0);

  return (
    <>
      <button onClick$={() => (isOpen.value = true)} class="modal-trigger">
        Open Modal
      </button>
      <p data-testid="show-count">onShow count: {showCount.value}</p>
      <p data-testid="close-count">onClose count: {closeCount.value}</p>
      <p data-testid="is-open">bind:show: {String(isOpen.value)}</p>
      <Modal.Root
        bind:show={isOpen}
        onShow$={() => showCount.value++}
        onClose$={() => closeCount.value++}
      >
        <Modal.Panel class="modal-panel test-fade">
          <Modal.Title>Reopen while closing</Modal.Title>
          <button
            onClick$={() => {
              isOpen.value = false;
              setTimeout(() => (isOpen.value = true), 100);
            }}
          >
            Close and reopen
          </button>
        </Modal.Panel>
      </Modal.Root>
    </>
  );
});

// internal
import styles from '../snippets/modal.css?inline';
