import {
  $,
  NoSerialize,
  PropsOf,
  QRL,
  Signal,
  Slot,
  component$,
  noSerialize,
  useSignal,
  useStyles$,
  useTask$,
  sync$,
  useContext,
} from '@builder.io/qwik';

import { modalContextId } from './modal-context';

import styles from './modal.css?inline';
import { useModal } from './use-modal';
import { isServer } from '@builder.io/qwik/build';
import { createNoScroll, markScrollable } from '@fluejs/noscroll';
import { initTouchHandler, resetTouchHandler } from '@fluejs/noscroll/touch';

export type ModalProps = Omit<PropsOf<'dialog'>, 'open'> & {
  onShow$?: QRL<() => void>;
  onClose$?: QRL<() => void>;
  'bind:show': Signal<boolean>;
  closeOnBackdropClick?: boolean;
  alert?: boolean;
};

export const HModalPanel = component$((props: PropsOf<'dialog'>) => {
  useStyles$(styles);
  const {
    activateFocusTrap,
    closeModal,
    deactivateFocusTrap,
    showModal,
    trapFocus,
    wasModalBackdropClicked,
  } = useModal();
  const context = useContext(modalContextId);

  const panelRef = useSignal<HTMLDialogElement>();
  const wasOpenSig = useSignal(false);
  const isInitialized = useSignal(false);
  const disablePageScroll = useSignal<NoSerialize<() => void>>();
  const enablePageScroll = useSignal<NoSerialize<() => void>>();

  useTask$(async function toggleModal({ track, cleanup }) {
    const isOpen = track(() => context.showSig.value);

    if (!panelRef.value) return;

    if (!isInitialized.value) {
      isInitialized.value = true;

      const noScroll = createNoScroll({
        onInitScrollDisable: initTouchHandler,
        onResetScrollDisable: resetTouchHandler,
      });

      disablePageScroll.value = noSerialize(noScroll.disablePageScroll);
      enablePageScroll.value = noSerialize(noScroll.enablePageScroll);
    }

    const focusTrap = await trapFocus(panelRef.value);

    if (isOpen) {
      await showModal(panelRef.value);

      // noscroll only lets touch gestures scroll elements it has marked.
      // Mark the panel and any inner scroll container (e.g. a scrollable body
      // with a sticky header/footer) so they remain touch-scrollable on iOS;
      // otherwise the gesture resolves to the non-scrollable dialog and gets
      // prevented. Re-scanned on each open to pick up the current content.
      markScrollable(panelRef.value);
      panelRef.value.querySelectorAll<HTMLElement>('*').forEach((el) => {
        const { overflowX, overflowY } = getComputedStyle(el);
        if (/(auto|scroll|overlay)/.test(`${overflowX} ${overflowY}`)) {
          markScrollable(el);
        }
      });

      disablePageScroll.value?.();
      activateFocusTrap(focusTrap);
    } else {
      await closeModal(panelRef.value);
    }

    cleanup(async () => {
      if (isServer) return;
      await deactivateFocusTrap(focusTrap);
      // Only the root modal restores page scroll; nested modals share the lock.
      if (context.level > 1) return;
      enablePageScroll.value?.();
    });
  });

  useTask$(async ({ track }) => {
    const isOpen = track(() => context.showSig.value);

    if (isOpen) {
      wasOpenSig.value = true;
      await context.onShow$?.();
    } else if (wasOpenSig.value) {
      await context.onClose$?.();
    }
  });

  const closeOnBackdropClick$ = $(async (e: MouseEvent) => {
    if (context.alert === true || context.closeOnBackdropClick === false) {
      return;
    }

    // We do not want to close elements that dangle outside of the modal
    if (!(e.target instanceof HTMLDialogElement)) {
      return;
    }

    if (await wasModalBackdropClicked(panelRef.value, e)) {
      context.showSig.value = false;
    }
  });

  const handleKeyDownSync$ = sync$((e: KeyboardEvent) => {
    const keys = [' ', 'Enter'];

    if (e.target instanceof HTMLDialogElement && keys.includes(e.key)) {
      e.preventDefault();
    }

    if (e.key === 'Escape') {
      e.preventDefault();
    }
  });

  const handleKeyDown$ = $((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      context.showSig.value = false;
      e.stopPropagation();
    }
  });

  return (
    <dialog
      {...props}
      id={`${context.localId}-root`}
      aria-labelledby={`${context.localId}-title`}
      aria-describedby={`${context.localId}-description`}
      // TODO: deprecate data-state in favor of data-open, data-closing, and data-closed
      data-state={context.showSig.value ? 'open' : 'closed'}
      data-open={context.showSig.value && ''}
      data-closed={!context.showSig.value && ''}
      role={context.alert === true ? 'alertdialog' : 'dialog'}
      ref={panelRef}
      onKeyDown$={[handleKeyDownSync$, handleKeyDown$, props.onKeyDown$]}
      onMouseDown$={async (e) => {
        e.stopPropagation();
        await closeOnBackdropClick$(e);
      }}
    >
      <Slot />
    </dialog>
  );
});
