import {
  $,
  QwikIntrinsicElements,
  Slot,
  component$,
  useContext,
  useSignal,
  useStylesScoped$,
  useVisibleTask$,
} from '@builder.io/qwik';
import { AriaKeysOnlyKebab } from '../../utils';
import { PopoverContext } from './popover-context';
import styles from './popover-trigger.css?inline';

export const PopoverTrigger = component$(
  (
    props: AriaKeysOnlyKebab<QwikIntrinsicElements['span']> & {
      tabIndex?: number;
    }
  ) => {
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
        {...props}
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
