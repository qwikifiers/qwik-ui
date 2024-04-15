import { component$, useSignal } from '@builder.io/qwik';
import { Modal, ModalDescription, ModalTitle } from '@qwik-ui/headless';

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
      <ModalTitle />
      <ModalDescription />
      {/* other content */}
    </Modal>
  );
});
