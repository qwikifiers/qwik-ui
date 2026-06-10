import {
  PropsOf,
  Slot,
  component$,
  useContext,
  useTask$,
  useSignal,
  $,
  useComputed$,
} from '@qwik.dev/core';
import { carouselContextId } from './context';
import { useCarousel } from './use-carousel';

export const CarouselNext = component$((props: PropsOf<'button'>) => {
  const context = useContext(carouselContextId);
  const isLastSlideInViewSig = useSignal(false);
  const initialLoadSig = useSignal(true);
  const isKeyboardFocusSig = useSignal(false);

  const { validIndexesSig } = useCarousel(context);

  const isLastScrollableIndexSig = useComputed$(() => {
    const validIndexes = validIndexesSig.value;
    return validIndexes[validIndexes.length - 1];
  });

  const handleFocusPrev$ = $(() => {
    if (context.isRewindSig.value) return;

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

    const validIndexes = validIndexesSig.value;
    isLastSlideInViewSig.value =
      validIndexes.indexOf(context.currentIndexSig.value) === validIndexes.length - 1;
  });

  useTask$(() => {
    initialLoadSig.value = false;
  });

  const handleClick$ = $(() => {
    const validIndexes = validIndexesSig.value;
    const currentIndex = context.currentIndexSig.value;
    const currentPosition = validIndexes.indexOf(currentIndex);

    if (currentPosition === validIndexes.length - 1 && context.isRewindSig.value) {
      context.currentIndexSig.value = validIndexes[0];
    } else {
      const nextPosition = Math.min(currentPosition + 1, validIndexes.length - 1);
      context.currentIndexSig.value = validIndexes[nextPosition];
    }
  });

  return (
    <button
      {...props}
      ref={context.nextButtonRef}
      aria-disabled={isLastSlideInViewSig.value && !context.isRewindSig.value}
      disabled={isLastSlideInViewSig.value && !context.isRewindSig.value}
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
