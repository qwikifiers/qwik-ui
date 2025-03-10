import { Signal, createContextId } from '@qwik.dev/core';
import { TPlacement } from './popover-root';

export const popoverContextId = createContextId<PopoverContext>('qui-popover');

export type PopoverContext = {
  // core state
  compId: string;
  isOpenSig: Signal<boolean>;
  floating?: boolean | TPlacement;
  localId: string;
  manual?: boolean;
  hover?: boolean;
  anchorRef?: Signal<HTMLElement | undefined>;

  // refs
  panelRef?: Signal<HTMLElement | undefined>;
  triggerRef?: Signal<HTMLElement | undefined>;
  arrowRef?: Signal<HTMLElement | undefined>;

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
  arrow?: boolean;
  hide?: 'referenceHidden' | 'escaped';
  inline?: boolean;
  transform?: string;
};
