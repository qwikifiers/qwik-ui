import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Introduction } from '@qwik-ui/headless';
import styles from './headless-css.css?inline';

export default component$(() => {
  const showSig = useSignal(false);
  useStyles$(styles);

  return (
    <Modal class="modal" bind:show={showSig}>
      <ModalHeader class="modal-header" />
      <ModalContent class="modal-body" />
      <ModalFooter class="modal-footer" />
    </Modal>
  );
});
