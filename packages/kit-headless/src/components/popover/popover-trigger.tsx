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
  (props: ExtendedPropsByAriaAttribute) => {
    const ref = useSignal<HTMLElement>();
    const contextService = useContext(PopoverContext);
    useStylesScoped$(styles);
    const store = useStore<Partial<QwikUiAreaAttributesFunctionReturnType>>({
      lastKey: undefined,
      ariaAttributes: {},
    });
    useTask$(({ track }) => {
      track(() => ({ ...props }));
      const { lastKey, ariaAttributes } = getAriaAttributes(
        props,
        store.lastKey
      );
      store.ariaAttributes = ariaAttributes;
      store.lastKey = lastKey;
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
        {...store.ariaAttributes}
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
