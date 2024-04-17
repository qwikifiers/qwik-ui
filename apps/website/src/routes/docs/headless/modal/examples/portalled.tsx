import { component$, useSignal, useStyles$, useVisibleTask$ } from '@builder.io/qwik';
import { Modal } from '@qwik-ui/headless';
import styles from '../snippets/modal.css?inline';
import flatpickr from 'flatpickr';
import datePickerStyles from 'flatpickr/dist/flatpickr.min.css?inline';

export default component$(() => {
  useStyles$(styles);
  useStyles$(datePickerStyles);
  const pickerTriggerRef = useSignal<HTMLButtonElement>();
  const isOpen = useSignal(false);

  useVisibleTask$(() => {
    if (pickerTriggerRef.value) {
      flatpickr(pickerTriggerRef.value);
    }
  });

  return (
    <>
      <button class="modal-trigger" onClick$={() => (isOpen.value = true)}>
        Open Modal
      </button>
      <Modal
        style={{ width: '300px', height: '200px', background: 'white' }}
        class="modal"
        bind:show={isOpen}
      >
        <button ref={pickerTriggerRef}>Open Date Picker</button>
      </Modal>
    </>
  );
});
