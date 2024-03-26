import { type QRL, type Signal } from '@builder.io/qwik';

export interface CollapsibleContext {
  isOpenSig: Signal<boolean | undefined>;
  itemId: string;
  defaultOpen: boolean | undefined;
  triggerRef: Signal<HTMLButtonElement | undefined>;
  contentRef: Signal<HTMLElement | undefined>;
  contentChildRef: Signal<HTMLElement | undefined>;
  contentHeightSig: Signal<number | null>;
  initialStateSig: Signal<boolean>;
  getContentDimensions$: QRL<() => void>;
}
