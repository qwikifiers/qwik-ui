import {
  Slot,
  component$,
  useComputed$,
  useSignal,
  useStyles$,
  useVisibleTask$,
} from '@builder.io/qwik';
import { Dialog } from '@qwik-ui/headless';
import styles from './dialog.root.css?inline';

export type DialogRef = Dialog.DialogRef;

export const Root = component$((props: Dialog.RootProps) => {
  // We cannot use useStylesScoped$ here because we need to override DaisyUI's classes
  // which are global.
  useStyles$(styles);

  const dialogRef = useSignal<Dialog.DialogRef>();

  const dialogClass = useComputed$(() => {
    const dialog = dialogRef.value;
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

  const classModalBoxFullScreen = useComputed$(() => {
    return props.fullScreen ? 'modal-box--full-screen' : '';
  });

  return (
    <>
      <Dialog.Root
        {...props}
        class={`${dialogClass.value} modal--backdrop`}
        ref={dialogRef}
      >
        <div class={`modal-box ${classModalBoxFullScreen.value}`}>
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
export const Content = component$(() => {
  return (
    <Dialog.Content>
      <div class="py-4">
        <Slot />
      </div>
    </Dialog.Content>
  );
});

export const Footer = component$(() => {
  return (
    <Dialog.Footer>
      <div class="modal-action">
        <Slot />
      </div>
    </Dialog.Footer>
  );
});
