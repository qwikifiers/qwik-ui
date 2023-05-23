import { Slot, component$, useComputed$, useSignal } from '@builder.io/qwik';
import { Dialog, DialogRef } from '@qwik-ui/headless';

export const Root = component$((props: Dialog.RootProps) => {
  const dialog = useSignal<DialogRef>();

  const modalClass = useComputed$(() => {
    const clazz = dialog.value?.opened ? 'modal modal-open' : 'modal';
    console.log('CHANGE', dialog.value?.opened, clazz);

    return clazz;
  });

  return (
    <Dialog.Root class={modalClass.value} {...props} ref={dialog}>
      <Slot />
    </Dialog.Root>
  );
});

export const Close = Dialog.Close;
export const Trigger = Dialog.Trigger;

export const Content = component$(() => {
  return (
    <Dialog.Content>
      <div class="modal-box">
        <Slot />
      </div>
    </Dialog.Content>
  );
});
export const ContentTitle = component$(() => {
  return (
    <Dialog.ContentTitle>
      <h3 class="font-bold text-lg">
        <Slot />
      </h3>
    </Dialog.ContentTitle>
  );
});
export const ContentText = component$(() => {
  return (
    <Dialog.ContentText>
      <p class="py-4">
        <Slot />
      </p>
    </Dialog.ContentText>
  );
});

export const Actions = component$(() => {
  return (
    <Dialog.Actions>
      <div class="modal-actions">
        <Slot />
      </div>
    </Dialog.Actions>
  );
});

/*

<!-- The button to open modal -->
<label for="my-modal" class="btn">open modal</label>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="my-modal" class="modal-toggle" />
<div class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Congratulations random Internet user!</h3>
    <p class="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
    <div class="modal-action">
      <label for="my-modal" class="btn">Yay!</label>
    </div>
  </div>
</div>

*/
