import {
  Signal,
  Slot,
  component$,
  useContextProvider,
  useId,
  useSignal,
} from '@builder.io/qwik';
import { popoverContextId, PopoverContext } from './popover-context';

export type PopoverRootProps = {
  popover?: 'manual' | 'auto';
  manual?: boolean;
  ref?: Signal<HTMLElement | undefined>;
  floating?: boolean | TPlacement;
  hover?: boolean;
  id?: string;
  'bind:panel'?: Signal<HTMLElement | undefined>;
};

export type FloatingProps = {
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

export type TPlacement =
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

type PopoverProps = PopoverRootProps & {
  floating?: boolean | TPlacement;
} & FloatingProps;

export const PopoverRoot = component$((props: PopoverProps) => {
  const {
    floating = true,
    manual,
    hover = false,
    gutter,
    flip = true,
    'bind:panel': givenPanelRef,
    shift,
    hide,
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = true,
    animationFrame = false,
    transform,
    ...rest
  } = props;

  // refs
  const rootRef = useSignal<HTMLElement | undefined>();
  const defaultPanelRef = useSignal<HTMLElement | undefined>();
  const panelRef = givenPanelRef ?? defaultPanelRef;
  const triggerRef = useSignal<HTMLElement | undefined>();
  const popoverPolyInitSig = useSignal(false);

  // state
  const isOpenSig = useSignal(false);

  // id's
  const localId = useId();
  const id = props.id ?? localId;
  const rootId = `${id}-root`;

  const context: PopoverContext = {
    id,
    floating,
    hover,
    panelRef,
    triggerRef,
    isOpenSig,
    popoverPolyInitSig,
    localId,
    manual,
    gutter,
    flip,
    shift,
    hide,
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
