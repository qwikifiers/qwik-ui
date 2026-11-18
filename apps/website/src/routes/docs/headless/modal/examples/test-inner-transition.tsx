import { component$, useStyles$ } from '@builder.io/qwik';
import { Modal } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(`
    .inner-transition-button {
      background-color: grey;
      transition: background-color 1s;
    }

    .inner-transition-button:hover {
      background-color: green;
    }

    .inner-transition-panel {
      margin: auto;
      padding: 2rem;
      opacity: 1;
      transition: opacity 1s;
    }

    .inner-transition-panel[data-closing] {
      opacity: 0;
    }
  `);

  return (
    <Modal.Root>
      <Modal.Trigger class="inner-transition-button">Open Modal</Modal.Trigger>
      <Modal.Panel class="inner-transition-panel">
        <Modal.Title>Inner transition</Modal.Title>
        <Modal.Close class="inner-transition-button">Close</Modal.Close>
      </Modal.Panel>
    </Modal.Root>
  );
});
