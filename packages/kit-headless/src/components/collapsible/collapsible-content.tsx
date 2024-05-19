import {
  Slot,
  component$,
  useContext,
  useSignal,
  $,
  useTask$,
  PropsOf,
} from '@builder.io/qwik';
import { collapsibleContextId } from './collapsible-context-id';

export type CollapsibleContentProps = PropsOf<'div'>;

import { isServer } from '@builder.io/qwik/build';

export const HCollapsibleContent = component$((props: CollapsibleContentProps) => {
  const context = useContext(collapsibleContextId);
  const isHiddenSig = useSignal<boolean>(!context.isOpenSig.value);
  // check if it's initially "animatable"
  const initialRenderSig = useSignal<boolean>(true);
  const contentId = `${context.itemId}-content`;
  const triggerId = `${context.itemId}-trigger`;

  const hideContent$ = $(() => {
    if (!context.isOpenSig.value) {
      isHiddenSig.value = true;
    }
  });

  /* detects if the content is animating. on the server everything is "animatable", we then filter out the animations on the client. */
  useTask$(async function automaticAnimations({ track }) {
    track(() => context.isOpenSig.value);

    if (isServer) {
      return;
    }

    if (!context.contentRef.value) return;

    await context.getContentDimensions$();

    /* check if there's a transition or animation */
    const { animationDuration, transitionDuration } = getComputedStyle(
      context.contentRef.value!,
    );

    // don't animate if initially open
    if (
      animationDuration === '0s' &&
      transitionDuration === '0s' &&
      !initialRenderSig.value
    ) {
      context.isAnimatedSig.value = false;
    } else {
      context.isAnimatedSig.value = true;
    }

    if (context.isOpenSig.value) {
      isHiddenSig.value = false;
    }

    setTimeout(() => {
      const { animationDuration, transitionDuration } = getComputedStyle(
        context.contentRef.value!,
      );

      if (animationDuration === '0s' && transitionDuration === '0s') {
        context.isAnimatedSig.value = false;
      }
    }, 25);

    initialRenderSig.value = false;
  });

  return (
    <div
      {...props}
      ref={context.contentRef}
      id={contentId}
      data-collapsible-content
      data-disabled={context.disabled ? '' : undefined}
      data-open={!initialRenderSig.value && context.isOpenSig.value ? '' : undefined}
      data-closed={!context.isOpenSig.value ? '' : undefined}
      onAnimationEnd$={[hideContent$, props.onAnimationEnd$]}
      onTransitionEnd$={[hideContent$, props.onTransitionEnd$]}
      hidden={context.isAnimatedSig.value ? isHiddenSig.value : !context.isOpenSig.value}
      aria-labelledby={triggerId}
    >
      <Slot />
    </div>
  );
});
