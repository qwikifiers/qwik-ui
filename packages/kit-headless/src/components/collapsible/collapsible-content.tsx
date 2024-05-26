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

  useTask$(async function animations({ track }) {
    track(() => context.isOpenSig.value);

    if (isServer || !context.isAnimatedSig.value) {
      return;
    }

    await context.getContentDimensions$();

    if (context.isOpenSig.value) {
      isHiddenSig.value = false;
    }

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
