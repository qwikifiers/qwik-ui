import { component$ } from '@builder.io/qwik';
import { Modal, Popover } from '@qwik-ui/headless';

export default component$(() => {
  return (
    <Modal.Root>
      <Modal.Trigger>Open Modal</Modal.Trigger>
      <Modal.Panel
        style={{ margin: 'auto', padding: '2rem', width: '20rem', height: '10rem' }}
      >
        <Modal.Title>Modal with a popover</Modal.Title>
        <Popover.Root preventClickThrough>
          <Popover.Trigger>Open popover</Popover.Trigger>
          <Popover.Panel style={{ padding: '1rem', border: '1px solid' }}>
            Popover content
          </Popover.Panel>
        </Popover.Root>
      </Modal.Panel>
    </Modal.Root>
  );
});
