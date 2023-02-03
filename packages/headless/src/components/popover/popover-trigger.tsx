import { $, component$, Slot, useContext, useStylesScoped$ } from '@builder.io/qwik';
import { PopoverContext } from "./popover";
import styles from './popover.css?inline';

export const PopoverTrigger = component$(
  () => {
    const ctx = useContext(PopoverContext);
    useStylesScoped$(styles);

    const open = $(() => ctx.isOpen = true )
    const toggle = $(() => ctx.isOpen = !ctx.isOpen )

    return (
      <span
        role="button"
        class="popover-trigger"
        onMouseOver$={() => {
          if (ctx.triggerEvent === 'mouseOver') {
            open()
          }
        }}

        onClick$={() => {
          if (ctx.triggerEvent === 'click') {
            toggle()
          }
        }}
      >
        <Slot />
      </span>
    );
  }
);

