import { component$, useStyles$ } from '@builder.io/qwik';
import { Modal, Label } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(`
    .modal-transition {
      opacity: 0;
      transform: scale(0.9);
      transition:
        opacity 0.35s ease-in-out,
        transform 0.35s ease-in-out,
        display 0.35s,
        overlay 0.35s;
      transition-behavior: allow-discrete;
    }

    .modal-transition:popover-open {
      opacity: 1;
      transform: scale(1);
    }

    @starting-style {
      .modal-transition:popover-open {
        opacity: 0;
        transform: scale(0.9);
      }
    }`);

  return (
    <Modal.Root>
      <Modal.Trigger class="modal-trigger">Open Modal</Modal.Trigger>
      <Modal.Panel class="modal-panel modal-transition">
        <Modal.Title>Edit Profile</Modal.Title>
        <Modal.Description>
          You can update your profile here. Hit the save button when finished.
        </Modal.Description>
        <Label>
          Name
          <input type="text" placeholder="John Doe" />
        </Label>
        <Label>
          Email
          <input type="text" placeholder="johndoe@gmail.com" />
        </Label>
        <footer>
          <Modal.Close class="modal-close">Cancel</Modal.Close>
          <Modal.Close class="modal-close">Save Changes</Modal.Close>
        </footer>
      </Modal.Panel>
    </Modal.Root>
  );
});
