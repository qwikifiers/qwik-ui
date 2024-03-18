import {
  type PropsOf,
  Slot,
  component$,
  useContext,
  useTask$,
  useSignal,
  $,
} from '@builder.io/qwik';
import CarouselContextId from './carousel-context-id';
import { isServer } from '@builder.io/qwik/build';

export type CarouselSlideProps = PropsOf<'div'>;

export const CarouselSlide = component$(({ ...props }: CarouselSlideProps) => {
  const context = useContext(CarouselContextId);
  const slideRef = useSignal<HTMLDivElement | undefined>();
  const localIndexSig = useSignal<number | null>(null);

  const handlePointerUp$ = $(() => {
    context.isDraggingSig.value = false;

    if (!context.containerRef.value || !slideRef.value) {
      return;
    }

    /*
      TODO: figure out why a separate DOMMatrix is why dragging and the buttons work properly.
    */
    const style = window.getComputedStyle(context.containerRef.value);
    const matrix = new DOMMatrix(style.transform);

    const containerTranslateX = matrix.m41;
    // How far to the left the slides container is shifted.
    const absContainerTranslateX = Math.abs(containerTranslateX);

    if (!context.viewportRef.value) {
      return;
    }

    // How far the left edge of this slide is from the left of the slides container.
    const slideSlideContainerLeftOffset = slideRef.value.offsetLeft;
    // How far the right edge of this slide is from the left of the slides container
    // (includes space between slide).
    const slideRightEdgePos =
      slideSlideContainerLeftOffset +
      slideRef.value.offsetWidth +
      context.spaceBetweenSlides;

    const carouselViewportWidth = context.viewportRef.value.offsetWidth;
    const halfViewportWidth = carouselViewportWidth / 2;

    const isWithinBounds =
      absContainerTranslateX > slideSlideContainerLeftOffset - halfViewportWidth &&
      absContainerTranslateX < slideRightEdgePos - halfViewportWidth;

    if (isWithinBounds) {
      context.transitionDurationSig.value = 300;

      /*
        we update here when mouse released (not when slide changes)
        this is how it can "snap" back to the previous slide
      */
      context.slideOffsetSig.value = slideSlideContainerLeftOffset * -1;
    }
  });

  useTask$(() => {
    // local index
    localIndexSig.value = context.numSlidesSig.value;

    // TODO: Refactor this out and use array length instead
    context.numSlidesSig.value++;

    context.slideRefsArray.value = [...context.slideRefsArray.value, slideRef];

    return;
  });

  useTask$(({ track }) => {
    track(() => context.isDraggingSig.value);

    if (isServer) return;

    context.isDraggingSig.value
      ? window.addEventListener('pointerup', handlePointerUp$)
      : window.removeEventListener('pointerup', handlePointerUp$);
  });

  useTask$(({ track }) => {
    track(() => context.currentIndexSig.value);
    if (localIndexSig.value === context.currentIndexSig.value && slideRef.value) {
      context.transitionDurationSig.value = 625;
      context.slideOffsetSig.value = slideRef.value.offsetLeft * -1;
    }

    /* TODO: figure out how to customize animation for separate actions:

    For example, this 625 is now for everything, because the slide index changing is our source of truth.

    Perhaps a bind?

    */
    setTimeout(() => {
      context.transitionDurationSig.value = 625;
    }, 0);
  });

  return (
    <div
      data-slide-num={localIndexSig.value}
      style={{ marginRight: `${context.spaceBetweenSlides}px` }}
      ref={slideRef}
      {...props}
    >
      <Slot />
    </div>
  );
});
