import { QRL, Signal, createContextId } from '@builder.io/qwik';

export const modalContextId = createContextId<ModalContext>('qui-modal');

export type ModalContext = {
  // core state
  localId: string;
  /** Nesting depth, starting at 1. Used so only the root modal restores page scroll. */
  level: number;
  showSig: Signal<boolean>;
  onShow$?: QRL<() => void>;
  onClose$?: QRL<() => void>;
  closeOnBackdropClick?: boolean;
  alert?: boolean;
};
