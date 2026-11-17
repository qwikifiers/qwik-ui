import { component$, useStyles$ } from '@builder.io/qwik';
import { Modal } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);
  useStyles$(`@layer utilities { .test-max-w-md { max-width: 28rem; } }`);

  return (
    <Modal.Root>
      <Modal.Trigger class="modal-trigger">Open Modal</Modal.Trigger>
      <Modal.Panel class="test-max-w-md" style={{ margin: 'auto', padding: '1rem' }}>
        <Modal.Title>Utility max width</Modal.Title>
        <Modal.Description>
          A max-width utility caps this panel at 28rem, so this long description wraps
          instead of stretching the panel across the whole page.
        </Modal.Description>
        <Modal.Close class="modal-close">Close</Modal.Close>
      </Modal.Panel>
    </Modal.Root>
  );
});

// internal
import styles from '../snippets/modal.css?inline';
