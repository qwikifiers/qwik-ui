import {
  PropsOf,
  Slot,
  component$,
  useContext,
  useTask$,
  useSignal,
  $,
  useComputed$,
  useId,
} from '@builder.io/qwik';
import { carouselContextId } from './context';
import { VisuallyHidden } from '../../utils/visually-hidden';

export const CarouselNext = component$((props: PropsOf<'button'>) => {
  const context = useContext(carouselContextId);
  const isLastSlideInViewSig = useSignal(false);
  const initialLoadSig = useSignal(true);
  const isKeyboardFocusSig = useSignal(false);
  const isLastScrollableIndexSig = useComputed$(() => {
    return context.numSlidesSig.value - context.slidesPerViewSig.value;
  });
  const nextId = useId();

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
    if (
      context.currentIndexSig.value >= isLastScrollableIndexSig.value &&
      context.isLoopSig.value
    ) {
      context.currentIndexSig.value = 0;
    } else {
      context.currentIndexSig.value++;
    }
  });

  return (
    <button
      {...props}
      ref={context.nextButtonRef}
      aria-disabled={isLastSlideInViewSig.value}
      disabled={isLastSlideInViewSig.value && !context.isLoopSig.value}
      onClick$={[handleClick$, props.onClick$]}
      onKeyDown$={[handleKeyDown$, props.onKeyDown$]}
      onBlur$={[handleFocusPrev$, props.onBlur$]}
      data-qui-carousel-next
      aria-labelledby={nextId}
    >
      <VisuallyHidden id={nextId}>next slide</VisuallyHidden>
      <Slot />
    </button>
  );
});
