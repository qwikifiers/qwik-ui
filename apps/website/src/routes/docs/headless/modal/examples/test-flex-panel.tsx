import { component$, useStyles$ } from '@builder.io/qwik';
import { Modal } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);
  useStyles$(`.test-flex { display: flex; flex-direction: column; }`);

  return (
    <Modal.Root>
      <Modal.Trigger class="modal-trigger">Open Modal</Modal.Trigger>
      <Modal.Panel class="modal-panel test-flex">
        <Modal.Title>Flex panel</Modal.Title>
        <Modal.Close class="modal-close">Close</Modal.Close>
      </Modal.Panel>
    </Modal.Root>
  );
});

// internal
import styles from '../snippets/modal.css?inline';
