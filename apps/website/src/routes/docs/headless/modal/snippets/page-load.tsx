import { component$, useSignal } from '@builder.io/qwik';
import { Modal, ModalContent, ModalFooter, ModalHeader } from '@qwik-ui/headless';

export default component$(() => {
  const showSig = useSignal(false);

  // uncomment this
  // useVisibleTask$(
  //   () => {
  //     showSig.value = true;
  //   },
  //   { strategy: 'document-ready' },
  // );

  return (
    <Modal bind:show={showSig}>
      <ModalHeader />
      <ModalContent />
      <ModalFooter />
    </Modal>
  );
});
