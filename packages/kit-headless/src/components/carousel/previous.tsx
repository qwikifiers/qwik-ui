import {
  PropsOf,
  Slot,
  component$,
  useContext,
  useSignal,
  $,
  useComputed$,
} from '@qwik.dev/core';
import { carouselContextId } from './context';
import { useCarousel } from './use-carousel';

export const CarouselPrevious = component$((props: PropsOf<'button'>) => {
  const context = useContext(carouselContextId);
  const isKeyboardFocusSig = useSignal(false);

  const { validIndexesSig } = useCarousel(context);

  const isFirstScrollableIndexSig = useComputed$(() => {
    return validIndexesSig.value[0];
  });

  const handleFocusNext$ = $(() => {
    if (context.isRewindSig.value) return;

    if (
      isKeyboardFocusSig.value &&
      context.currentIndexSig.value === isFirstScrollableIndexSig.value
    ) {
      const activeElAtBlur = document.activeElement;
      setTimeout(() => {
        if (document.activeElement !== activeElAtBlur) return;
        if (context.currentIndexSig.value === isFirstScrollableIndexSig.value) {
          context.nextButtonRef.value?.focus();
        }
      }, 2000);
    }
    isKeyboardFocusSig.value = false;
  });

  const handleKeyDown$ = $(() => {
    isKeyboardFocusSig.value = true;
  });

  const handleClick$ = $(() => {
    const validIndexes = validIndexesSig.value;
    const currentIndex = context.currentIndexSig.value;
    const currentPosition = validIndexes.indexOf(currentIndex);

    if (currentPosition === 0 && context.isRewindSig.value) {
      context.currentIndexSig.value = validIndexes[validIndexes.length - 1];
    } else {
      const prevPosition = Math.max(currentPosition - 1, 0);
      context.currentIndexSig.value = validIndexes[prevPosition];
    }
  });

  const isFirstSlideSig = useComputed$(() => {
    return context.currentIndexSig.value === isFirstScrollableIndexSig.value;
  });

  return (
    <button
      {...props}
      ref={context.prevButtonRef}
      aria-disabled={isFirstSlideSig.value && !context.isRewindSig.value}
      disabled={isFirstSlideSig.value && !context.isRewindSig.value}
      onClick$={[handleClick$, props.onClick$]}
      onBlur$={[handleFocusNext$, props.onBlur$]}
      onKeyDown$={[handleKeyDown$, props.onKeyDown$]}
      data-qui-carousel-prev
      aria-label="previous slide"
    >
      <Slot />
    </button>
  );
});
