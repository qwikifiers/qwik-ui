import { createContextId, QRL, Signal } from '@builder.io/qwik';

interface PopoverContextProps {
  isOpen: boolean;
  triggerEvent?: 'click' | 'mouseOver';
  // NEW
  setTriggerRef$: QRL<(ref: Signal<HTMLElement | undefined>) => void>;
  setOverlayRef$: QRL<(ref: Signal<HTMLElement | undefined>) => void>;
}
export const PopoverContext = createContextId<PopoverContextProps>('popover-context');
