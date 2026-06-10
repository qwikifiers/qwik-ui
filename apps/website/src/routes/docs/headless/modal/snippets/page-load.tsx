import { component$ } from '@qwik.dev/core';
import { Modal } from '@qwik-ui/headless';

export default component$(() => {
  // uncomment this
  // useVisibleTask$(
  //   () => {
  //     showSig.value = true;
  //   },
  //   { strategy: 'document-ready' },
  // );

  return (
    <Modal.Root>
      <Modal.Trigger>Open Modal</Modal.Trigger>
      <Modal.Panel>
        <Modal.Title />
        <Modal.Description />
        {/* other content */}
      </Modal.Panel>
    </Modal.Root>
  );
});
