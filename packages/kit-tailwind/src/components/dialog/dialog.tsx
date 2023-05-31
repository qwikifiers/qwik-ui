import {
  Slot,
  component$,
  useComputed$,
  useSignal,
  useStyles$,
  useVisibleTask$,
} from '@builder.io/qwik';
import { Dialog } from '@qwik-ui/headless';

export type DialogRef = Dialog.DialogRef;

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

  const dialogRef = useSignal<Dialog.DialogRef>();

  const dialogClass = useComputed$(() => {
    const dialog = dialogRef.value;
    console.log('as;dlaksd;ka', dialogRef.value);
    const clazz = dialog?.isOpen.value ? 'modal modal-open' : 'modal';

    return clazz;
  });

  useVisibleTask$(({ track }) => {
    // HACK: If the dialogRef is not tracked, the ref is not propagated sometimes.
    //       Normally, we should not need to track the dialogRef.
    track(() => dialogRef.value);

    if (!props.ref) return;

    props.ref.value = dialogRef.value;
  });

  return (
    <>
      <Dialog.Root
        {...props}
        class={`${dialogClass.value} modal--backdrop`}
        ref={dialogRef}
      >
        <div class="modal-box">
          <Slot />
        </div>
      </Dialog.Root>
    </>
  );
});

export const Header = component$(() => {
  return (
    <Dialog.Header>
      <h3 class="font-bold text-lg">
        <Slot />
      </h3>
    </Dialog.Header>
  );
});
export const Content = Dialog.Content;

export const Footer = component$(() => {
  return (
    <Dialog.Footer>
      <div class="modal-action">
        <Slot />
      </div>
    </Dialog.Footer>
  );
});
