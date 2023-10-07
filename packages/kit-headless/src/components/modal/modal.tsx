import {
  $,
  component$,
  QRL,
  QwikIntrinsicElements,
  QwikMouseEvent,
  Signal,
  Slot,
  useSignal,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik';
import { isServer } from '@builder.io/qwik/build';
import styles from './modal-root.css?inline';

/**
 * Todo-List
 * ---------
 *
 * [ ] Have a look at Radix-Dialog to get inspired by features/examples
 *     * What is important for BETA
 *     * What might be implemented later
 * [ ] Think about more tests
 *

<modal bind:open={mySig}>

</modal>

 */

export type ModalProps = Omit<QwikIntrinsicElements['dialog'], 'open'> & {
  fullScreen?: Signal<boolean>; // TODO: change to bind
  onShow$?: QRL<() => void>;
  onHide$?: QRL<() => void>;
  show?: boolean;
  'bind:show'?: Signal<boolean | undefined>;
};

// TODO: Introduce bind:open to allow passing a signal.
export const Modal = component$((props: ModalProps) => {
  const { 'bind:show': givenOpenSig, ...rest } = props;
  useStylesScoped$(styles);

  /** Contains reference to the rendered HTMLDialogElement. */
  const refSig = useSignal<HTMLDialogElement>();

  /** Indicates whether the modal is open. */

  const defaultOpenSig = useSignal(false);
  const openSig = givenOpenSig || defaultOpenSig;

  const closeOnBackdropClick$ = $(
    (event: QwikMouseEvent<HTMLDialogElement, MouseEvent>) => {
      if (hasDialogBackdropBeenClicked(event)) {
        openSig.value = false;
      }
    },
  );

  useTask$(async function syncOpenProp({ track }) {
    const openPropValue = track(() => props.show);

    openSig.value = openPropValue;
  });

  useTask$(async function openOrCloseModal({ track }) {
    const isOpen = track(() => openSig.value);

    const dialog = refSig.value;

    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
      await props.onShow$?.();
    } else {
      await props.onHide$?.();
      dialog.close();
    }
  });

  useTask$(async function lockScrollingWhenModalIsOpened({ track }) {
    if (isServer) return;

    // TODO: Make this work with SSR
    //       Idea: using useVisibleTask$ and check whether Modal has been opened
    //             on the server. If it has been opened lock scrolling.
    const isOpened = track(() => openSig.value);

    window.document.body.style.overflow = isOpened ? 'hidden' : '';
  });

  return (
    <dialog
      {...rest}
      class={`${props.class} ${props.fullScreen ? 'full-screen' : ''}`}
      ref={refSig}
      onClick$={closeOnBackdropClick$}
      onClose$={() => (openSig.value = false)}
    >
      <Slot />
    </dialog>
  );
});

function hasDialogBackdropBeenClicked(
  event: QwikMouseEvent<HTMLDialogElement, MouseEvent>,
) {
  const rect = (event.target as HTMLDialogElement).getBoundingClientRect();

  return (
    rect.left > event.clientX ||
    rect.right < event.clientX ||
    rect.top > event.clientY ||
    rect.bottom < event.clientY
  );
}
