import { $, component$, Slot, useClientEffect$, useContext, useSignal, useStylesScoped$ } from '@builder.io/qwik';
import { PopoverContext } from './popover-context';
import styles from './popover-trigger.css?inline';

export const PopoverTrigger = component$(
  () => {
    const ref = useSignal<HTMLElement>();
    const contextService = useContext(PopoverContext);
    useStylesScoped$(styles);

    useClientEffect$(() => {
      contextService.setTriggerRef$(ref);
    });

    const mouseOverHandler = $(() => {
      if (contextService.triggerEvent === 'mouseOver') {
        contextService.isOpen = true
      }
    })

    return (
      <span
        ref={ref}
        class="popover-trigger"
        onMouseOver$={mouseOverHandler}
      >
        <Slot />
      </span>
    );
  }
);

