import { component$, useSignal } from '@builder.io/qwik';
import { Modal } from '@qwik-ui/headless';

export default component$(() => {
  const showSig = useSignal(true);

  return (
    <Modal.Root bind:show={showSig}>
      <Modal.Panel>
        <Modal.Title />
        <Modal.Description />
        {/* other content */}
      </Modal.Panel>
    </Modal.Root>
  );
});
