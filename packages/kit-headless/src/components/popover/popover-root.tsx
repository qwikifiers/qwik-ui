import {
  PropsOf,
  Signal,
  Slot,
  component$,
  useContextProvider,
  useId,
  useSignal,
} from '@builder.io/qwik';

import {
  popoverContextId,
  type Floating,
  type Placement,
  type PopoverContext,
} from './popover-types';

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

  return (
    <div ref={rootRef} id={rootId} {...rest}>
      <Slot />
    </div>
  );
});
