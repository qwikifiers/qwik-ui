import { Signal, createContextId } from '@builder.io/qwik';
import { TPlacement } from './popover-root';

export const popoverContextId = createContextId<PopoverContext>('qui-popover');

export type PopoverContext = {
  // core state
  id: string;
  isOpenSig: Signal<boolean>;
  floating?: boolean | TPlacement;
  localId: string;
  manual?: boolean;
  hover?: boolean;
  popoverPolyInitSig: Signal<boolean>;

  // refs
  panelRef?: Signal<HTMLElement | undefined>;
  triggerRef?: Signal<HTMLElement | undefined>;

  // floating props
  ancestorScroll?: boolean;
  ancestorResize?: boolean;
  elementResize?: boolean;
  layoutShift?: boolean;
  animationFrame?: boolean;
  gutter?: number;
  shift?: boolean;
  flip?: boolean;
  size?: boolean;
  hide?: 'referenceHidden' | 'escaped';
  inline?: boolean;
  transform?: string;
};
