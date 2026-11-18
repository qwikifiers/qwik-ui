import {
  $,
  PropsOf,
  QRL,
  Signal,
  Slot,
  component$,
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
import { markScrollableElements, pageScroll } from '../../utils/page-scroll';

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
  const isPageLoadedSig = useSignal(false);

  useTask$(async function toggleModal({ track, cleanup }) {
    const isOpen = track(() => context.showSig.value);
    track(() => panelRef.value);
    track(() => isPageLoadedSig.value);

    if (!panelRef.value) return;

    const focusTrap = await trapFocus(panelRef.value);

    if (isOpen) {
      await showModal(panelRef.value);

      markScrollableElements(panelRef.value);

      pageScroll.disablePageScroll();
      activateFocusTrap(focusTrap);
      await context.onShow$?.();
    } else if (panelRef.value.open) {
      panelRef.value.dataset.closing = '';
      closeModal(panelRef.value).then(async (isClosed) => {
        if (isClosed) await context.onClose$?.();
      });
    }

    cleanup(async () => {
      if (isServer) return;
      await deactivateFocusTrap(focusTrap);
      if (isOpen) pageScroll.enablePageScroll();
    });
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

  const openOnPageLoad$ = $(() => {
    isPageLoadedSig.value = true;
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
      data-qui-modal-panel
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
      document:onQInit$={context.showSig.value ? openOnPageLoad$ : undefined}
      onMouseDown$={async (e) => {
        e.stopPropagation();
        await closeOnBackdropClick$(e);
      }}
    >
      <Slot />
    </dialog>
  );
});
