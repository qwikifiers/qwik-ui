import {
  component$,
  createContext,
  Slot,
  useClientEffect$, useContextProvider,
  useSignal,
  useStore,
} from "@builder.io/qwik";
import { autoUpdate, computePosition, flip, shift, } from "@floating-ui/dom";

interface PopoverContextProps  {
  isOpen: boolean,
  triggerEvent?: 'click' | 'mouseOver';
}
export const PopoverContext = createContext<PopoverContextProps>('popover-context');

interface PopoverProps {
  alignments?: 'auto' | 'left' | 'top' | '...'; // TODO
  triggerEvent?: 'click' | 'mouseOver';
}

export const Popover = component$((props: PopoverProps) => {
  const { triggerEvent = 'click' } = props;

  const wrapper = useSignal<HTMLElement>();
  const state = useStore({ isOpen: false, triggerEvent });

  useContextProvider(PopoverContext, state);

  useClientEffect$(() => {
    const contentEl = wrapper.value?.querySelector<HTMLElement>('[role="tooltip"]');
    const triggerEl = wrapper.value?.querySelector<HTMLElement>('[role="button"]');

    if (!contentEl || !triggerEl) return;

    return autoUpdate(triggerEl, contentEl, () => {
      computePosition(
        triggerEl,
        contentEl,
        { middleware: [flip(), shift()] }
      ).then(({x, y}) => {
        Object.assign(contentEl.style, {
          left: `${x}px`,
          top: `${y}px`,
        });
      });
    });
  });

  return (
    <div ref={wrapper}>
      <Slot />
    </div>
  )
});
