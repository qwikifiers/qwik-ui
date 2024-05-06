import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Modal } from '@qwik-ui/headless';
import styles from '../snippets/modal.css?inline';

export default component$(() => {
  useStyles$(styles);
  const isOpen = useSignal(false);

  return (
    <>
      <button class="modal-trigger" onClick$={() => (isOpen.value = true)}>
        Open Modal
      </button>
      <Modal.Root class="modal" bind:show={isOpen}>
        Modal Content
        <NestedModal />
      </Modal.Root>
    </>
  );
});

export const NestedModal = component$(() => {
  useStyles$(styles);
  const isNestedOpen = useSignal(false);

  return (
    <>
      <button class="modal-trigger" onClick$={() => (isNestedOpen.value = true)}>
        Nested Modal Trigger
      </button>
      <Modal.Root class="modal" bind:show={isNestedOpen}>
        Nested Modal Content
      </Modal.Root>
    </>
  );
});
