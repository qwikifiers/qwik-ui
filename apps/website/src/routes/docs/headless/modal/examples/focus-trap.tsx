import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Modal } from '@qwik-ui/headless';
import styles from '../snippets/modal.css?inline';

export default component$(() => {
  useStyles$(styles);
  const isOpen = useSignal(false);

  return (
    <Modal.Root bind:show={isOpen}>
      <Modal.Trigger class="modal-trigger">Open Modal</Modal.Trigger>
      <Modal.Panel class="modal">
        Modal Content
        <input placeholder="inside input" />
        <button>inside button</button>
      </Modal.Panel>
      <input placeholder="outside input" />
    </Modal.Root>
  );
});
