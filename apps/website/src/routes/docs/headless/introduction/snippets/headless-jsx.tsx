import { component$, useStyles$ } from '@qwik.dev/core';
import { Modal } from '@qwik-ui/headless';
import styles from './headless-css.css?inline';

export default component$(() => {
  useStyles$(styles);

  return (
    <Modal.Root>
      <Modal.Trigger>Open Modal</Modal.Trigger>
      <Modal.Panel class="modal-panel">Modal Content</Modal.Panel>
    </Modal.Root>
  );
});
