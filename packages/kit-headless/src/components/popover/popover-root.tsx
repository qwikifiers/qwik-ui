import {
  PropsOf,
  Signal,
  Slot,
  component$,
  useContextProvider,
  useId,
  useSignal,
  useTask$,
} from '@builder.io/qwik';

import {
  popoverContextId,
  type Floating,
  type Placement,
  type PopoverContext,
} from './popover-types';
import { outsidePressHandlers } from './modal-outside-press';
import { isServer } from '@builder.io/qwik/build';
import { useModalPageScrollLock } from '../../utils/page-scroll';
import { activateFocusTrap, createModalFocusTrap } from '../../utils/focus-trap';
import type { FocusTrap } from 'focus-trap';

export type PopoverRootProps = {
  popover?: 'manual' | 'auto';
  manual?: boolean;
  ref?: Signal<HTMLElement | undefined>;
  floating?: boolean | Placement;
  /** @deprecated Use the tooltip instead, which adheres to the WAI-ARIA design pattern. */
  hover?: boolean;
  id?: string;
  'bind:anchor'?: Signal<HTMLElement | undefined>;
  'bind:panel'?: Signal<HTMLElement | undefined>;
  /** While the panel is open, the rest of the page takes no pointer input and does not scroll, and focus stays in the panel. */
  modal?: boolean;
};

export type PopoverProps = PopoverRootProps & {
  floating?: boolean | Placement;
} & Floating &
  PropsOf<'div'>;

export const HPopoverRoot = component$((props: PopoverProps) => {
  const {
    id,
    'bind:anchor': givenAnchorRef,
    'bind:panel': givenPanelRef,
    floating = true,
    modal,
    manual,
    hover = false,
    gutter,
    flip = true,
    shift,
    hide,
    arrow,
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = true,
    animationFrame = false,
    transform,
    strategy,
    ...rest
  } = props;

  // refs
  const anchorRef = givenAnchorRef;
  const rootRef = useSignal<HTMLElement | undefined>();
  const defaultPanelRef = useSignal<HTMLElement | undefined>();
  const panelRef = givenPanelRef ?? defaultPanelRef;
  const triggerRef = useSignal<HTMLElement | undefined>();
  const arrowRef = useSignal<HTMLElement | undefined>();

  // state
  const isOpenSig = useSignal(false);

  // id's
  const localId = useId();
  const compId = id ?? localId;
  const rootId = `${compId}-root`;

  const context: PopoverContext = {
    anchorRef,
    compId,
    floating,
    hover,
    panelRef,
    triggerRef,
    arrowRef,
    isOpenSig,
    localId,
    manual,
    arrow,
    gutter,
    flip,
    shift,
    hide,
    strategy,
    ancestorScroll,
    ancestorResize,
    elementResize,
    animationFrame,
    transform,
  };

  useContextProvider(popoverContextId, context);

  useModalPageScrollLock(isOpenSig, props, panelRef);

  useTask$(({ track, cleanup }) => {
    const isTrapped = track(() => isOpenSig.value && props.modal && !props.manual);
    const panel = panelRef.value;

    if (isServer || !isTrapped || !panel) return;

    let focusTrap: FocusTrap | undefined;
    let isClosed = false;

    const trapFocusOncePanelShows = async () => {
      while (panel.hidden && !isClosed) {
        await new Promise(requestAnimationFrame);
      }
      if (isClosed) return;

      focusTrap = createModalFocusTrap(panel, {
        allowOutsideClick: true,
        setReturnFocus: (previouslyFocused) => triggerRef.value ?? previouslyFocused,
      });
      activateFocusTrap(focusTrap);
    };
    trapFocusOncePanelShows();

    cleanup(() => {
      isClosed = true;
      focusTrap?.deactivate();
    });
  });

  return (
    <div
      ref={rootRef}
      id={rootId}
      data-modal-scope={props.modal && !props.manual ? 'auto' : undefined}
      {...outsidePressHandlers(modal && !manual)}
      {...rest}
    >
      <Slot />
    </div>
  );
});
