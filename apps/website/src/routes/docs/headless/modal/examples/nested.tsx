import { component$, useStyles$ } from '@builder.io/qwik';
import { Modal } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);

  return (
    <Modal.Root>
      <Modal.Trigger class="modal-trigger">Open Modal</Modal.Trigger>
      <Modal.Panel class="modal">
        Modal Content
        <NestedModal />
      </Modal.Panel>
    </Modal.Root>
  );
});

export const NestedModal = component$(() => {
  useStyles$(styles);

  return (
    <Modal.Root>
      <Modal.Trigger class="modal-trigger">Nested Modal Trigger</Modal.Trigger>
      <Modal.Panel class="modal">Nested Modal Content</Modal.Panel>
    </Modal.Root>
  );
});

// internal
import styles from '../snippets/modal.css?inline';
