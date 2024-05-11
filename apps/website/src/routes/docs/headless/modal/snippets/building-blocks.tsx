import { component$ } from '@builder.io/qwik';
import { Modal } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <Modal.Root>
      <Modal.Trigger>Open Modal</Modal.Trigger>
      <Modal.Panel>
        <Modal.Title>Accessible Name</Modal.Title>
        <Modal.Description>Optional Description</Modal.Description>
        {/* other content */}
      </Modal.Panel>
    </Modal.Root>
  );
});
