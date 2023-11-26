import {
  QwikIntrinsicElements,
  Slot,
  component$,
  useContext,
  useTask$,
  useSignal,
  useOnWindow,
  $,
  useComputed$,
} from '@builder.io/qwik';
import CarouselContextId from './carousel-context-id';
import { isServer } from '@builder.io/qwik/build';

export type CarouselSlideProps = QwikIntrinsicElements['div'];

export const CarouselSlide = component$(({ ...props }: CarouselSlideProps) => {
  const context = useContext(CarouselContextId);
  const slideRef = useSignal<HTMLDivElement | undefined>();
  const isOnClientSig = useSignal<boolean>(false);
  const serverRenderedSig = useSignal<boolean>(false);

  // current slide sig change auto computes slide offset
  useComputed$(() => {
    const currIndex = context.currentSlideSig.value - 1;
    const currentSlideElement = context.allSlideRefs.value[currIndex];

    if (currentSlideElement) {
      context.slideOffsetSig.value = currentSlideElement.offsetLeft * -1;
    }
  });

  // programmatically move slides
  useComputed$(() => {
    if (!context.moveToSig) {
      return;
    }

    const isSameSlide = context.moveToSig.value === context.currentSlideSig.value;

    if (context.moveToSig.value === null || isSameSlide) {
      return;
    }

    context.currentSlideSig.value = context.moveToSig.value;
    context.transitionDurationSig.value = 625;

    // Reset after move
    context.moveToSig.value = null;
  });

  useTask$(({ track }) => {
    track(() => isOnClientSig.value);

    if (isServer || !slideRef.value) {
      serverRenderedSig.value = true;
      context.numSlidesSig.value++;
      return;
    }

    if (!serverRenderedSig.value) {
      // do it on the client if SPA
      context.numSlidesSig.value++;
    }

    // get all slide dimensions
    context.allSlideRefs.value = [...context.allSlideRefs.value, slideRef.value];
  });

  useOnWindow(
    'DOMContentLoaded',
    $(() => {
      isOnClientSig.value = true;
    }),
  );

  return (
    <div
      style={{ marginRight: `${context.spaceBetweenSlides}px` }}
      ref={slideRef}
      {...props}
    >
      <Slot />
    </div>
  );
});
