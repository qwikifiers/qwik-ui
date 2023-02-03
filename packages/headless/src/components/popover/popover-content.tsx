import {
  component$,
  useContext,
  Slot,
  useStylesScoped$, $,

} from '@builder.io/qwik';
import { clsq } from '@qwik-ui/shared';
import { PopoverContext } from "./popover";
import styles from './popover.css?inline';


export const PopoverContent = component$(
  () => {
    useStylesScoped$(styles);
    const ctx = useContext(PopoverContext);

    const close = $(() => ctx.isOpen = false )

    return (
      <div
        role="tooltip"
        onMouseLeave$={() => {
          if (ctx.triggerEvent === 'mouseOver') {
            close()
          }
        }}
        class={clsq(
          'popover-content',
          {
            open: ctx.isOpen,
            close: !ctx.isOpen,
          }
        )}
      >
        <Slot />
      </div>
    );
  }
);

