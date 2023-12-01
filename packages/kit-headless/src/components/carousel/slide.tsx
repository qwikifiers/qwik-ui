import {
  QwikIntrinsicElements,
  Slot,
  component$,
  useContext,
  useTask$,
  useSignal,
} from '@builder.io/qwik';
import CarouselContextId from './carousel-context-id';

export type CarouselSlideProps = QwikIntrinsicElements['div'];

export const CarouselSlide = component$(({ ...props }: CarouselSlideProps) => {
  const context = useContext(CarouselContextId);
  const slideRef = useSignal<HTMLDivElement | undefined>();
  const localIndexSig = useSignal<number | null>(null);

  useTask$(() => {
    // local index
    localIndexSig.value = context.numSlidesSig.value;
    context.numSlidesSig.value++;

    return;
  });

  useTask$(({ track }) => {
    track(() => context.currentIndexSig.value);
    if (localIndexSig.value === context.currentIndexSig.value && slideRef.value) {
      context.slideOffsetSig.value = slideRef.value.offsetLeft * -1;
    }

    /* TODO: figure out how to customize animation for seprate actions:

    For example, this 625 is now for everything, because the slide index changing is our source of truth.

    Perhaps a bind?

    */
    setTimeout(() => {
      context.transitionDurationSig.value = 625;
    }, 0);
  });

  return (
    <div
      window:onPointerUp$={(e) => {
        console.log('Pointer up');

        if (!context.isDraggingSig.value) {
          return;
        }

        context.isDraggingSig.value = false;

        if (!context.containerRef.value || !slideRef.value) {
          return;
        }

        const deltaX = e.clientX - context.initialX.value;

        const containerTranslateX = context.initialTransformX.value + deltaX;
        const absContainerTranslateX = Math.abs(containerTranslateX);

        if (!context.viewportRef.value) {
          return;
        }

        const slideRightEdgePos =
          slideRef.value.offsetLeft +
          slideRef.value.offsetWidth +
          context.spaceBetweenSlides;

        const halfViewportWidth = context.viewportRef.value.offsetWidth / 2;

        const isWithinBounds =
          absContainerTranslateX > slideRef.value.offsetLeft - halfViewportWidth &&
          absContainerTranslateX < slideRightEdgePos - halfViewportWidth;

        if (isWithinBounds) {
          context.currentIndexSig.value = localIndexSig.value || 0;

          /*
            we update here when mouse released (not when slide changes)
            this is how it can "snap" back to the previous slide
          */
          context.slideOffsetSig.value = slideRef.value.offsetLeft * -1;

          context.transitionDurationSig.value = 300;
        }
      }}
      style={{ marginRight: `${context.spaceBetweenSlides}px` }}
      ref={slideRef}
      {...props}
    >
      <Slot />
    </div>
  );
});
