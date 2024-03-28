import { type QRL, type Signal } from '@builder.io/qwik';

export interface CollapsibleContext {
  isOpenSig: Signal<boolean>;
  itemId: string;
  triggerRef: Signal<HTMLButtonElement | undefined>;
  contentRef: Signal<HTMLElement | undefined>;
  contentHeightSig: Signal<number | null>;
  getContentDimensions$: QRL<() => void>;
}
