import {
  component$,
  createContext,
  Slot,
  useClientEffect$, useContextProvider,
  useSignal,
  useStore,
} from "@builder.io/qwik";
import { autoUpdate, computePosition, flip, shift, } from "@floating-ui/dom";

// context
export const PopoverContext = createContext<{ isOpen: boolean }>('popover-context');

// popover component example (TODO)
interface PopoverProps {
  alignments?: 'auto' | 'left' | 'top' | '...';
}

export const Popover = component$(() => {
  const wrapper = useSignal<HTMLElement>();
  const state = useStore({ isOpen: false });
  useContextProvider(PopoverContext, state);

  useClientEffect$(() => {
    const content = wrapper.value?.querySelector<HTMLElement>('[role="tooltip"]');
    const trigger = wrapper.value?.querySelector<HTMLElement>('[role="button"]');
    return autoUpdate(trigger!, content!, () => {
      computePosition(
        trigger!,
        content!,
        { middleware: [flip(), shift()] }
      ).then(({x, y}) => {
        Object.assign(content!.style, {
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
