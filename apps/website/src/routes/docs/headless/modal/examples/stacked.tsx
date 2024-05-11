import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Modal } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);
  const isRootOpen = useSignal(false);
  const isStackedOpen = useSignal(false);

  return (
    <Modal.Root bind:show={isRootOpen}>
      <Modal.Trigger class="modal-trigger">Open Modal</Modal.Trigger>
      <Modal.Panel class="modal">
        <Modal.Title>Open stacked Modal</Modal.Title>
        <Modal.Description>
          You can open a Modal on top of another Modal.
        </Modal.Description>
        <Modal.Root bind:show={isStackedOpen}>
          <Modal.Trigger class="modal-trigger">Open Modal</Modal.Trigger>
          <Modal.Panel class="modal" style={{ width: '50%' }}>
            <Modal.Title>I am a stacked Modal</Modal.Title>
            <Modal.Description>
              You cannot interact with the other modal until you close me.
            </Modal.Description>
            <button onClick$={() => (isStackedOpen.value = false)}>Close Modal</button>
          </Modal.Panel>
        </Modal.Root>
      </Modal.Panel>
    </Modal.Root>
  );
});

// internal
import styles from '../snippets/modal.css?inline';
