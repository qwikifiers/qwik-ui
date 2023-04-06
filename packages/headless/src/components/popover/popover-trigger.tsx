import {
  $,
  component$,
  Slot,
  useVisibleTask$,
  useContext,
  useSignal,
  useStylesScoped$,
} from '@builder.io/qwik';
import { PopoverContext } from './popover-context';
import styles from './popover-trigger.css?inline';

export const PopoverTrigger = component$(() => {
  const ref = useSignal<HTMLElement>();
  const contextService = useContext(PopoverContext);
  useStylesScoped$(styles);

  useVisibleTask$(() => {
    contextService.setTriggerRef$(ref);
  });

  const mouseOverHandler = $(() => {
    contextService.isOpen = true;
  });

  return (
    <span
      ref={ref}
      class="popover-trigger"
      onMouseOver$={
        contextService.triggerEvent === 'mouseOver'
          ? mouseOverHandler
          : undefined
      }
    >
      <Slot />
    </span>
  );
});
