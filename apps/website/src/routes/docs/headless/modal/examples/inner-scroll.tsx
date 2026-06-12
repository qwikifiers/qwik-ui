import { component$, useStyles$ } from '@builder.io/qwik';
import { Modal } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);

  return (
    <Modal.Root>
      <Modal.Trigger class="modal-trigger">Open Modal</Modal.Trigger>
      <Modal.Panel class="modal-panel">
        <h2>Scrollable body</h2>
        <div data-testid="inner-scroll" style={{ height: '120px', overflowY: 'auto' }}>
          <div style={{ height: '800px' }}>Tall content that scrolls inside the panel</div>
        </div>
      </Modal.Panel>
    </Modal.Root>
  );
});

// internal
import styles from '../snippets/modal.css?inline';
