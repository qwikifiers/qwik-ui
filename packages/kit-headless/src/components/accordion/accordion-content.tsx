import {
  component$,
  useStylesScoped$,
  Slot,
  type QwikIntrinsicElements,
  useContext,
  useSignal,
  useTask$,
  $,
  useComputed$,
} from '@builder.io/qwik';

import {
  accordionItemContextId,
  accordionRootContextId,
} from './accordion-context-id';

import { isBrowser } from '@builder.io/qwik/build';

export type ContentProps = QwikIntrinsicElements['div'];

export const AccordionContent = component$(({ ...props }: ContentProps) => {
  const contextService = useContext(accordionRootContextId);
  const ref = useSignal<HTMLElement | undefined>();
  const contentElement = ref.value;
  const itemContext = useContext(accordionItemContextId);
  const contentId = `${itemContext.itemId}-content`;
  const isTriggerExpandedSig = itemContext.isTriggerExpandedSig;
  const isContentHiddenSig = useSignal<boolean>(true);
  const animated = contextService.animated;

  const hideContent$ = $(() => {
    if (!isTriggerExpandedSig.value) {
      isContentHiddenSig.value = true;
    }
  });

  // data-state alone is good for transitions on open & close
  useStylesScoped$(`
    [data-state] {
      overflow: hidden;
      --qwikui-collapsible-content-height: 80px;
    }
  
    [data-state="closed"] {
      animation: 500ms cubic-bezier(0.87, 0, 0.13, 1) 0s 1 normal forwards accordion-close;
    }

    [data-state="open"] {
      animation: 500ms cubic-bezier(0.87, 0, 0.13, 1) 0s 1 normal forwards accordion-open;
    }

    @keyframes accordion-open {
      0% {
        height: 0;
      }
      100% {
        height: var(--qwikui-collapsible-content-height);
      }
    }

    @keyframes accordion-close {
      0% {
        height: var(--qwikui-collapsible-content-height);
      }
      100% {
        height: 0;
      }
    }
  `);

  // const checkHeight = useComputed$(() => {
  //   const height = contentElement?.offsetHeight;

  //   return height;
  // });

  useTask$(function animateContentTask({ track }) {
    track(() => isTriggerExpandedSig.value);

    if (animated && isTriggerExpandedSig.value) {
      isContentHiddenSig.value = false;
    }

    // if (isBrowser) {
    //   console.log('checkHeight', checkHeight.value);
    // }
  });

  return (
    <>
      <div
        ref={ref}
        role="region"
        id={contentId}
        data-content-id={contentId}
        data-state={isTriggerExpandedSig.value ? 'open' : 'closed'}
        hidden={
          animated ? isContentHiddenSig.value : !isTriggerExpandedSig.value
        }
        onAnimationEnd$={[hideContent$, props.onAnimationEnd$]}
        onTransitionEnd$={[hideContent$, props.onTransitionEnd$]}
        style={{
          ['--qwikui-accordion-content-height' as string]:
            'var(--qwikui-collapsible-content-height)',
          ['--qwikui-accordion-content-width' as string]:
            'var(--qwikui-collapsible-content-width)',
        }}
        {...props}
      >
        <Slot />
      </div>
    </>
  );
});
