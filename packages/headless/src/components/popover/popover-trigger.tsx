import { $, component$, Slot, useContext, useStylesScoped$ } from '@builder.io/qwik';
import { PopoverContext } from './popover-context';
import styles from './popover-trigger.css?inline';

export const PopoverTrigger = component$(
  () => {
    const ctx = useContext(PopoverContext);
    useStylesScoped$(styles);

    const mouseOverHandler = $(() => {
      if (ctx.triggerEvent === 'mouseOver') {
        ctx.isOpen = true
      }
    })

    return (
      <span
        role="button"
        class="popover-trigger"
        onMouseOver$={mouseOverHandler}
      >
        <Slot />
      </span>
    );
  }
);

