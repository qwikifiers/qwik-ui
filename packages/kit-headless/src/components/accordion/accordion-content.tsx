import {
  component$,
  useStylesScoped$,
  Slot,
  useContext,
  useSignal,
  useTask$,
  $,
  useVisibleTask$,
  type QwikIntrinsicElements,
} from '@builder.io/qwik';

import { accordionItemContextId, accordionRootContextId } from './accordion-context-id';

export type ContentProps = QwikIntrinsicElements['div'];

export const AccordionContent = component$(({ ...props }: ContentProps) => {
  const contextService = useContext(accordionRootContextId);
  const itemContext = useContext(accordionItemContextId);

  const ref = useSignal<HTMLElement>();
  const contentElement = ref.value;
  const contentId = `${itemContext.itemId}-content`;

  const animated = contextService.animated;
  const defaultValue = itemContext.defaultValue;
  const totalHeightSig = useSignal<number>(0);

  const isTriggerExpandedSig = itemContext.isTriggerExpandedSig;
  const isContentHiddenSig = useSignal<boolean>(!defaultValue);

  const hideContent$ = $(() => {
    if (!isTriggerExpandedSig.value) {
      isContentHiddenSig.value = true;
    }
  });

  useStylesScoped$(`
    /* check global.css utilites layer for animation */
    @keyframes accordion-open {
      0% {
        height: 0;
      }
      100% {
        height: var(--qwikui-accordion-content-height);
      }
    }
  
    @keyframes accordion-close {
        0% {
          height: var(--qwikui-accordion-content-height);
        }
        100% {
          height: 0;
        }
      }
  `);

  /* allows animate / transition from display none */
  useTask$(function animateContentTask({ track }) {
    if (!animated) {
      return;
    }

    track(() => isTriggerExpandedSig.value);

    if (isTriggerExpandedSig.value) {
      isContentHiddenSig.value = false;
    }
  });

  /* calculates height of the content container based on children */
  useVisibleTask$(function calculateHeightVisibleTask({ track }) {
    if (animated === false) {
      return;
    }

    track(() => isContentHiddenSig.value);

    if (totalHeightSig.value === 0) {
      getCalculatedHeight();
    }

    function getCalculatedHeight() {
      if (!contentElement) {
        return;
      }

      const contentChildren = Array.from(contentElement.children) as HTMLElement[];

      contentChildren.forEach((element, index) => {
        totalHeightSig.value += element.offsetHeight;

        if (index === contentChildren.length - 1) {
          contentElement.style.setProperty(
            '--qwikui-accordion-content-height',
            `${totalHeightSig.value}px`,
          );
        }
      });
    }
  });

  return (
    <div
      ref={ref}
      role="region"
      id={contentId}
      data-content-id={contentId}
      data-state={isTriggerExpandedSig.value ? 'open' : 'closed'}
      hidden={animated ? isContentHiddenSig.value : !isTriggerExpandedSig.value}
      onAnimationEnd$={[hideContent$, props.onAnimationEnd$]}
      onTransitionEnd$={[hideContent$, props.onTransitionEnd$]}
      style={{
        ['--qwikui-collapsible-content-height' as string]:
          'var(--qwikui-accordion-content-height)',
        ['--qwikui-collapsible-content-width' as string]:
          'var(--qwikui-accordion-content-width)',
      }}
      {...props}
    >
      <Slot />
    </div>
  );
});
