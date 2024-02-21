import { component$ } from '@builder.io/qwik';
import {
  Button,
  Input,
  Label,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTrigger,
  ModalWrapper,
} from '@qwik-ui/styled';

export default component$(() => {
  return (
    <ModalWrapper>
      <ModalTrigger>
        <Button>Open modal</Button>
      </ModalTrigger>
      <Modal>
        <ModalHeader>
          <h2 class="text-lg font-bold">Edit Profile</h2>
          <p class="text-sm font-light">
            Make changes to your profile here. Click save when you're done.
          </p>
        </ModalHeader>
        <ModalContent>
          <div class="grid gap-4 py-4">
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="name" class="text-right">
                Name
              </Label>
              <Input id="name" defaultValue="Pedro Duarte" class="col-span-3" />
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="username" class="text-right">
                Username
              </Label>
              <Input id="username" defaultValue="@peduarte" class="col-span-3" />
            </div>
          </div>
        </ModalContent>
        <ModalFooter>
          <Button type="submit">Save changes</Button>
        </ModalFooter>
      </Modal>
    </ModalWrapper>
  );
});
