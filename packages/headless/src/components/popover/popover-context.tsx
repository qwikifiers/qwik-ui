import { createContext } from '@builder.io/qwik';

interface PopoverContextProps  {
  isOpen: boolean,
  triggerEvent?: 'click' | 'mouseOver';
}
export const PopoverContext = createContext<PopoverContextProps>('popover-context');
