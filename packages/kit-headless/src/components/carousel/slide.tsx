import {
  QwikIntrinsicElements,
  Slot,
  component$,
  useContext,
  useTask$,
  useSignal,
  $,
} from '@builder.io/qwik';
import CarouselContextId from './carousel-context-id';
import { isServer } from '@builder.io/qwik/build';

export type CarouselSlideProps = QwikIntrinsicElements['div'];

export const CarouselSlide = component$(({ ...props }: CarouselSlideProps) => {
  const context = useContext(CarouselContextId);
  const slideRef = useSignal<HTMLDivElement | undefined>();
  const localIndexSig = useSignal<number | null>(null);

  const handlePointerUp$ = $(() => {
    console.log('Pointer up');

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
    context.numSlidesSig.value++;

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

  /* 

    1. native CSS solution

    container queries -> always check their container size.
    2. We can do that programmatically, by having a track on the container width.
    useTask$
    track(() => carouselViewport.style.width) -> make change to slide width (swiper does this)

    3. resize -> listens to window resize

    999999.
  */
  useTask$(({ track }) => {
    if (isServer) return;

    track(() => context.viewportRef.value?.offsetWidth);

    console.log('my viewport width changed!');
  });

  return (
    <div
      /*
        TODO: reduce the amount of window pointermove events happening here, all we want to do is update the 
        slide when dragging.
      */
      window:onPointerMove$={() => {
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
          context.currentIndexSig.value = localIndexSig.value || 0;
        }

        console.log('CURR INDEX: ', context.currentIndexSig.value);
      }}
      style={{ marginRight: `${context.spaceBetweenSlides}px` }}
      ref={slideRef}
      {...props}
    >
      <Slot />
    </div>
  );
});
