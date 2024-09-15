import {
  PropsOf,
  Slot,
  component$,
  useContext,
  useTask$,
  useSignal,
  $,
  useComputed$,
} from '@builder.io/qwik';
import { carouselContextId } from './context';

export const CarouselNext = component$((props: PropsOf<'button'>) => {
  const context = useContext(carouselContextId);
  const isLastSlideInViewSig = useSignal(false);
  const initialLoadSig = useSignal(true);
  const isKeyboardFocusSig = useSignal(false);
  const isLastScrollableIndexSig = useComputed$(() => {
    return context.numSlidesSig.value - context.slidesPerViewSig.value;
  });

  const handleFocusPrev$ = $(() => {
    if (context.isLoopSig.value) return;

    if (isKeyboardFocusSig.value && isLastSlideInViewSig.value) {
      const activeElAtBlur = document.activeElement;
      setTimeout(() => {
        if (document.activeElement !== activeElAtBlur) return;
        if (isLastScrollableIndexSig.value >= context.currentIndexSig.value) {
          context.prevButtonRef.value?.focus();
        }
      }, 2000);
    }
    isKeyboardFocusSig.value = false;
  });

  const handleKeyDown$ = $(() => {
    if (!isLastScrollableIndexSig.value) return;

    isKeyboardFocusSig.value = true;
  });

  useTask$(function updateSlidesPerViewState({ track }) {
    track(() => context.currentIndexSig.value);

    if (initialLoadSig.value) return;

    isLastSlideInViewSig.value =
      context.currentIndexSig.value >= isLastScrollableIndexSig.value;
  });

  useTask$(() => {
    initialLoadSig.value = false;
  });

  const handleClick$ = $(() => {
    const move = context.moveSig.value;
    const currentIndex = context.currentIndexSig.value;
    const lastIndex = context.numSlidesSig.value - 1;
    const lastScrollableIndex = isLastScrollableIndexSig.value;

    if (currentIndex >= lastScrollableIndex && context.isLoopSig.value) {
      context.currentIndexSig.value = 0;
    } else {
      const remainingSlides = lastIndex - currentIndex;
      const actualMove = Math.min(move, remainingSlides);
      context.currentIndexSig.value = Math.min(currentIndex + actualMove, lastIndex);
    }
  });

  return (
    <button
      {...props}
      ref={context.nextButtonRef}
      aria-disabled={isLastSlideInViewSig.value && !context.isLoopSig.value}
      disabled={isLastSlideInViewSig.value && !context.isLoopSig.value}
      onClick$={[handleClick$, props.onClick$]}
      onKeyDown$={[handleKeyDown$, props.onKeyDown$]}
      onBlur$={[handleFocusPrev$, props.onBlur$]}
      data-qui-carousel-next
      aria-label="next slide"
    >
      <Slot />
    </button>
  );
});
