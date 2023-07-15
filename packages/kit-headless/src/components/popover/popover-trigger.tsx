import {
  $,
  Slot,
  component$,
  useContext,
  useSignal,
  useStylesScoped$,
  useVisibleTask$,
} from '@builder.io/qwik';
import { ExtendedPropsByAriaAttribute } from '../../utils';
import { useAriaAttributes } from '../../utils/aria-attributes-helper';
import { PopoverContext } from './popover-context';
import styles from './popover-trigger.css?inline';

export const PopoverTrigger = component$(
  ({ ariaAttributes }: ExtendedPropsByAriaAttribute) => {
    const ref = useSignal<HTMLElement>();
    const contextService = useContext(PopoverContext);
    useStylesScoped$(styles);

    useVisibleTask$(() => {
      contextService.setTriggerRef$(ref);
    });

    const mouseOverHandler = $(() => {
      contextService.isOpen = true;
    });

    const interesstingAriaAttributes = useAriaAttributes(ariaAttributes);

    return (
      <span
        ref={ref}
        {...interesstingAriaAttributes}
        role="button"
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
  }
);
