import { component$, useSignal } from '@builder.io/qwik';
import {
  Button,
  Input,
  Label,
  ModalPanel,
  ModalTrigger,
  ModalDescription,
  ModalTitle,
  ModalRoot,
} from '@qwik-ui/styled';

export default component$(() => {
  const show = useSignal(false);

  return (
    <ModalRoot bind:show={show}>
      <ModalTrigger>Open modal</ModalTrigger>
      <ModalPanel>
        <ModalTitle class="text-lg font-bold">Edit Profile</ModalTitle>
        <ModalDescription class="text-sm font-light">
          Make changes to your profile here. Click save when you're done.
        </ModalDescription>
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
      </ModalPanel>
    </ModalRoot>
  );
});
