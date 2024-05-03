import { component$, useSignal } from '@builder.io/qwik';
import { Modal } from '@qwik-ui/headless';

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
    <Modal.Root bind:show={showSig}>
      <Modal.Title />
      <Modal.Description />
      {/* other content */}
    </Modal.Root>
  );
});
