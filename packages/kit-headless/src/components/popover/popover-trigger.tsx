import {
  $,
  Slot,
  component$,
  useContext,
  useSignal,
  useStore,
  useStylesScoped$,
  useTask$,
  useVisibleTask$,
} from '@builder.io/qwik';
import {
  ExtendedPropsByAriaAttribute,
  QwikUiAreaAttributesFunctionReturnType,
  getAriaAttributes,
} from '../../utils';
import { PopoverContext } from './popover-context';
import styles from './popover-trigger.css?inline';

export const PopoverTrigger = component$(
  (props: ExtendedPropsByAriaAttribute<'span'>) => {
    const ref = useSignal<HTMLElement>();
    const contextService = useContext(PopoverContext);
    useStylesScoped$(styles);
    const ariaAttributesStore = useStore<
      Partial<QwikUiAreaAttributesFunctionReturnType<'span'>>
    >({
      lastKey: undefined,
      ariaAttributes: undefined,
    });
    useTask$(({ track }) => {
      track(() => ({ ...props }));
      const { lastKey, ariaAttributes } = getAriaAttributes<'span'>(
        props,
        ariaAttributesStore.lastKey
      );
      ariaAttributesStore.ariaAttributes = ariaAttributes;
      ariaAttributesStore.lastKey = lastKey;
    });

    useVisibleTask$(() => {
      contextService.setTriggerRef$(ref);
    });

    const mouseOverHandler = $(() => {
      contextService.isOpen = true;
    });
    return (
      <span
        ref={ref}
        {...ariaAttributesStore.ariaAttributes}
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
