import {
  PropsOf,
  Slot,
  component$,
  useContext,
  useTask$,
  useSignal,
  $,
} from '@builder.io/qwik';
import { carouselContextId } from './context';
import { VisuallyHidden } from '../../utils/visually-hidden';

export const CarouselNext = component$((props: PropsOf<'button'>) => {
  const context = useContext(carouselContextId);
  const isLastSlideInViewSig = useSignal(false);
  const initialLoadSig = useSignal(true);
  const isKeyboardFocusSig = useSignal(false);

  const handleFocus$ = $((e: FocusEvent) => {
    isKeyboardFocusSig.value = e.detail === 0;
  });

  const handleBlur$ = $(() => {
    if (isKeyboardFocusSig.value && isLastSlideInViewSig.value) {
      context.prevButtonRef.value?.focus();
    }
    isKeyboardFocusSig.value = false;
  });

  useTask$(function updateSlidesPerViewState({ track }) {
    track(() => context.currentIndexSig.value);

    if (initialLoadSig.value) return;

    const lastScrollableIndex =
      context.numSlidesSig.value - context.slidesPerViewSig.value;

    isLastSlideInViewSig.value = context.currentIndexSig.value >= lastScrollableIndex;
  });

  useTask$(() => {
    initialLoadSig.value = false;
  });

  const handleClick$ = $(() => {
    if (!isLastSlideInViewSig.value) {
      context.currentIndexSig.value++;
    }
  });

  return (
    <button
      {...props}
      ref={context.nextButtonRef}
      aria-disabled={isLastSlideInViewSig.value}
      disabled={isLastSlideInViewSig.value}
      onClick$={[handleClick$, props.onClick$]}
      onFocus$={[handleFocus$, props.onFocus$]}
      onBlur$={[handleBlur$, props.onBlur$]}
      data-qui-carousel-next
    >
      <VisuallyHidden>next slide</VisuallyHidden>
      <Slot />
    </button>
  );
});
