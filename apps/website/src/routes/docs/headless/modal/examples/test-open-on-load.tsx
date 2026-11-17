import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { isServer } from '@builder.io/qwik/build';
import { Modal } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(styles);
  const isOpen = useSignal(true);
  const showCount = useSignal(0);
  const shownOn = useSignal('nowhere');

  return (
    <>
      <p data-testid="show-count">onShow count: {showCount.value}</p>
      <p data-testid="shown-on">onShow ran on: {shownOn.value}</p>
      <div style={{ height: '200vh' }} />
      <Modal.Root
        bind:show={isOpen}
        onShow$={() => {
          showCount.value++;
          shownOn.value = isServer ? 'the server' : 'the browser';
        }}
      >
        <Modal.Panel class="modal-panel">
          <Modal.Title>Open on load</Modal.Title>
          <Modal.Close class="modal-close">Close</Modal.Close>
        </Modal.Panel>
      </Modal.Root>
    </>
  );
});

// internal
import styles from '../snippets/modal.css?inline';
