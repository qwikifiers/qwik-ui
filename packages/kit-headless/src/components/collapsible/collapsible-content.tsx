import {
  type QwikIntrinsicElements,
  Slot,
  component$,
  useContext,
  useSignal,
  $,
  useTask$,
} from '@builder.io/qwik';
import { collapsibleContextId } from './collapsible-context-id';

export type CollapsibleContentProps = QwikIntrinsicElements['div'];

export const CollapsibleContent = component$((props: CollapsibleContentProps) => {
  const context = useContext(collapsibleContextId);
  const isHiddenSig = useSignal<boolean>(false);
  const isAnimatedSig = useSignal<boolean>(false);

  const hideContent$ = $(() => {
    if (!context.isOpenSig.value) {
      isHiddenSig.value = true;
    }
  });

  /* detects if the content is animating */
  useTask$(async function automaticAnimations({ track }) {
    track(() => context.isOpenSig.value);

    if (!context.contentRef.value) return;

    await context.getContentDimensions$();

    /* check if there's a transition or animation */
    const { animationDuration, transitionDuration } = getComputedStyle(
      context.contentRef.value,
    );

    if (animationDuration !== '0s') {
      console.log(animationDuration);
      isAnimatedSig.value = true;
    } else if (transitionDuration !== '0s') {
      isAnimatedSig.value = true;
    }

    if (context.isOpenSig.value) {
      isHiddenSig.value = false;
    }

    context.initialStateSig.value = false;
  });

  return (
    <div
      {...props}
      ref={context.contentRef}
      data-state={
        context.initialStateSig.value
          ? 'initial'
          : context.isOpenSig.value
          ? 'open'
          : 'closed'
      }
      onAnimationEnd$={[hideContent$, props.onAnimationEnd$]}
      onTransitionEnd$={[hideContent$, props.onTransitionEnd$]}
      hidden={isAnimatedSig.value ? isHiddenSig.value : !context.isOpenSig.value}
    >
      <Slot />
    </div>
  );
});
