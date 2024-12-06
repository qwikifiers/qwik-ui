import { component$, useStyles$ } from '@builder.io/qwik';
import { Modal, Label } from '@qwik-ui/headless';

export default component$(() => {
  useStyles$(`
    .modal-animation {
      animation: modalClose 0.35s ease-in-out forwards;
    }

    .modal-animation:popover-open {
      animation: modalOpen 0.75s ease-in-out forwards;
    }

    @keyframes modalOpen {
      from {
        opacity: 0;
        transform: scale(0.9);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes modalClose {
      from {
        opacity: 1;
        transform: scale(1);
      }
      to {
        opacity: 0;
        transform: scale(0.9);
      }
    }`);

  return (
    <Modal.Root>
      <Modal.Trigger class="modal-trigger">Open Modal</Modal.Trigger>
      <Modal.Panel class="modal-panel modal-animation">
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
