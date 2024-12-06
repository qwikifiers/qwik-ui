import { component$, useStyles$ } from '@builder.io/qwik';
import { Modal } from '@qwik-ui/headless';
import styles from '../snippets/modal.css?inline';

export default component$(() => {
  useStyles$(styles);

  return (
    <Modal.Root>
      <Modal.Trigger class="modal-trigger">Open Modal</Modal.Trigger>
      <Modal.Panel class="modal-panel">
        Modal Content
        <input placeholder="inside input" />
        <button>inside button</button>
      </Modal.Panel>
      <input placeholder="outside input" />
    </Modal.Root>
  );
});
