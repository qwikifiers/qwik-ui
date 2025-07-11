import { type Signal, createContextId } from '@builder.io/qwik';

export type Floating = {
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
  arrow?: boolean;
  strategy?: 'absolute' | 'fixed';
};

export type Placement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end';

export type PopoverContext = Floating & {
  // core state
  compId: string;
  isOpenSig: Signal<boolean>;
  floating?: boolean | Placement;
  localId: string;
  manual?: boolean;
  hover?: boolean;
  anchorRef?: Signal<HTMLElement | undefined>;

  // refs
  panelRef?: Signal<HTMLElement | undefined>;
  triggerRef?: Signal<HTMLElement | undefined>;
  arrowRef?: Signal<HTMLElement | undefined>;
};

export const popoverContextId = createContextId<PopoverContext>('qui-popover');
