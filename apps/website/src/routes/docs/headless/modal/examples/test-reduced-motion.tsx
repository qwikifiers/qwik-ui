import { component$, useStyles$ } from '@builder.io/qwik';
import { Modal } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);
  useStyles$(`
    .test-duration-only { animation-duration: 0.3s; }
    @media (prefers-reduced-motion: no-preference) {
      .test-duration-only { animation-name: fadeOut; }
      .test-duration-only[data-open] { animation-name: fadeIn; }
    }
    @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
    @keyframes fadeOut { from { opacity: 1 } to { opacity: 0 } }
  `);

  return (
    <Modal.Root>
      <Modal.Trigger class="modal-trigger">Open Modal</Modal.Trigger>
      <Modal.Panel class="modal-panel test-duration-only">
        <Modal.Title>Reduced motion</Modal.Title>
        <Modal.Close class="modal-close">Close</Modal.Close>
      </Modal.Panel>
    </Modal.Root>
  );
});

// internal
import styles from '../snippets/modal.css?inline';
