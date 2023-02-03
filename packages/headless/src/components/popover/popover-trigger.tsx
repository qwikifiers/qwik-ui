import { component$, Slot, useContext, useStylesScoped$ } from '@builder.io/qwik';
import { myContext } from "./popover";
import styles from './popover.css?inline';



// popover component
interface PopoverTriggerProps {
  triggerEvents?: 'click' | 'mouseOver';
}

export const PopoverTrigger = component$(
  (props: PopoverTriggerProps) => {
    const ctx = useContext(myContext);
    useStylesScoped$(styles);

    return (
      <span
        role="button"
        class="popover-trigger"
        /*onMouseOver$={() => {
          ctx.isOpen = true;
        }}*/
        /*onMouseLeave$={() => ctx.isOpen = false}*/
        onClick$={() => {
          ctx.isOpen = !ctx.isOpen
        }}
      >
        <Slot />
      </span>
    );
  }
);

