import { component$, useSignal } from '@builder.io/qwik';
import { cn } from '@qwik-ui/utils';
import { LuX } from '@qwikest/icons/lucide';
import { Button, Input, Label, Modal, buttonVariants } from '~/components/ui';

export default component$(() => {
  const show = useSignal(false);
  return (
    <Modal.Root bind:show={show}>
      <Modal.Trigger class={[buttonVariants({ look: 'outline' })]}>
        Open modal
      </Modal.Trigger>
      <Modal.Panel>
        <Modal.Title>Edit Profile</Modal.Title>
        <Modal.Description>
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
          <Button look="primary" onClick$={() => (show.value = false)}>
            Save
          </Button>
        </footer>
        <Modal.Close
          class={cn(
            buttonVariants({ size: 'icon', look: 'link' }),
            'absolute right-3 top-2',
          )}
          type="submit"
        >
          <LuX class="h-5 w-5" />
        </Modal.Close>
      </Modal.Panel>
    </Modal.Root>
  );
});
