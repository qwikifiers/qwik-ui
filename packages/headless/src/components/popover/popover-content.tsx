import {
  component$,
  useContext,
  Slot,
  useStylesScoped$,

} from "@builder.io/qwik";
import { clsq } from '@qwik-ui/shared';
import { myContext } from "./popover";
import styles from './popover.css?inline';


export const PopoverContent = component$(
  () => {
    useStylesScoped$(styles);
    const ctx = useContext(myContext);

    return (
      <div
        role="content"
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

