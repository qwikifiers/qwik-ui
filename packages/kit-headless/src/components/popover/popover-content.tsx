import {
  component$,
  Slot,
  useVisibleTask$,
  useContext,
  useSignal,
  useStylesScoped$,
} from '@builder.io/qwik';
import styles from './popover-content.css?inline';
import { PopoverContext } from './popover-context';

export const PopoverContent = component$(() => {
  const ref = useSignal<HTMLElement>();
  const contextService = useContext(PopoverContext);
  useStylesScoped$(styles);

  useVisibleTask$(() => {
    contextService.setOverlayRef$(ref);
  });

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Popover"
      class="popover-content"
    >
      <Slot />
    </div>
  );
});
