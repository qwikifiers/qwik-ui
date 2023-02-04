import { component$, Slot, useStylesScoped$} from '@builder.io/qwik';
import styles from './popover-content.css?inline';

export const PopoverContent = component$(
  () => {
    useStylesScoped$(styles);

    return (
      <div
        role="tooltip"
        class="popover-content">
        <Slot />
      </div>
    );
  }
);

