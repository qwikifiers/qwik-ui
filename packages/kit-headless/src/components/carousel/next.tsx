import {
  PropsOf,
  Slot,
  component$,
  useContext,
  useTask$,
  useSignal,
} from '@builder.io/qwik';
import { carouselContextId } from './context';
import { VisuallyHidden } from '../../utils/visually-hidden';

export const CarouselNext = component$((props: PropsOf<'button'>) => {
  const context = useContext(carouselContextId);
  const isLastSlideInViewSig = useSignal(false);
  const initialLoadSig = useSignal(true);

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

  return (
    <button
      {...props}
      aria-disabled={isLastSlideInViewSig.value}
      disabled={isLastSlideInViewSig.value}
      onClick$={() => {
        if (!isLastSlideInViewSig.value) {
          context.currentIndexSig.value++;
        }
      }}
      data-qui-carousel-next
    >
      <VisuallyHidden>next slide</VisuallyHidden>
      <Slot />
    </button>
  );
});
