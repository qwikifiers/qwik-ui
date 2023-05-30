import {
  Slot,
  component$,
  useComputed$,
  useSignal,
  useStyles$,
} from '@builder.io/qwik';
import { Dialog, DialogRef } from '@qwik-ui/headless';

export const Root = component$((props: Dialog.RootProps) => {
  /**
   *
   * We use DaisyUI's css classes for modal to style the dialog.
   * DaisyUI builds on top of Div-Elements. We use the <dialog>-Element.
   *
   * That's why we need to move the backdrop styling to the dialog's
   * backdrop-pseudo-element.
   *
   */
  useStyles$(`
    .modal--backdrop {
      background-color: initial;
    }

    .modal--backdrop::backdrop {
      background-color: hsl(var(--nf, var(--n)) / var(--tw-bg-opacity));

      /* copied from daisy-ui modal */

      --n: 218.18 18.033% 11.961%;
      --nf: 222.86 17.073% 8.0392%;
      --tw-bg-opacity: .4;
    }
  `);

  const dialog = useSignal<DialogRef>();

  const dialogClass = useComputed$(() => {
    const clazz = dialog.value?.opened ? 'modal modal-open' : 'modal';

    return clazz;
  });

  return (
    <>
      <Dialog.Root
        class={`${dialogClass.value} modal--backdrop`}
        {...props}
        ref={dialog}
      >
        <Slot />
      </Dialog.Root>
    </>
  );
});

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
    <Dialog.Header>
      <h3 class="font-bold text-lg">
        <Slot />
      </h3>
    </Dialog.Header>
  );
});

export const ContentText = component$(() => {
  return (
    <Dialog.Content>
      <p class="py-4">
        <Slot />
      </p>
    </Dialog.Content>
  );
});

export const Actions = component$(() => {
  return (
    <Dialog.Footer>
      <div class="modal-action">
        <Slot />
      </div>
    </Dialog.Footer>
  );
});
