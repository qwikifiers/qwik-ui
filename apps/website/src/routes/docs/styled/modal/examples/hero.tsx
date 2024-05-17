import { component$, useSignal } from '@builder.io/qwik';
import { Button, Input, Label, Modal } from '~/components/ui';

export default component$(() => {
  const show = useSignal(false);

  return (
    <Modal.Root bind:show={show}>
      <Modal.Trigger>Open modal</Modal.Trigger>
      <Modal.Panel>
        <Modal.Title class="text-lg font-bold">Edit Profile</Modal.Title>
        <Modal.Description class="text-sm font-light">
          Make changes to your profile here. Click save when you're done.
        </Modal.Description>
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="name" class="text-right">
              Name
            </Label>
            <Input name="name" id="name" defaultValue="Pedro Duarte" class="col-span-3" />
          </div>
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="username" class="text-right">
              Username
            </Label>
            <Input
              name="username"
              id="username"
              defaultValue="@peduarte"
              class="col-span-3"
            />
          </div>
        </div>
        <footer>
          <Button onClick$={() => (show.value = false)} type="submit">
            Save changes
          </Button>
        </footer>
      </Modal.Panel>
    </Modal.Root>
  );
});
