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
interface ContextProps { isOpen: boolean }
export const myContext = createContext<ContextProps>('my-context');

// popover component
interface PopoverProps {
  alignments?: 'auto' | 'left' | 'top' | '...';
}

export const Popover = component$((props: PopoverProps) => {
  const state = useStore({ isOpen: false });

  useContextProvider(myContext, state);

  const wrapper = useSignal<HTMLElement>();

  useClientEffect$(() => {
    const content = wrapper.value?.querySelector<HTMLElement>('[role="content"]');
    const trigger = wrapper.value?.querySelector<HTMLElement>('[role="trigger"]');
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
