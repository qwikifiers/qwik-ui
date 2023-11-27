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
    const currentSlideElement = context.allSlideRefs.value[context.currentIndexSig.value];

    if (currentSlideElement) {
      context.slideOffsetSig.value = currentSlideElement.offsetLeft * -1;
    }

    /* TODO: figure out how to customize animation for seprate actions:

    For example, this 625 is now for everything, because the slide index changing is our source of truth.

    Perhaps a bind?

    */
    context.transitionDurationSig.value = 625;
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
    if (isOnClientSig.value) {
      context.allSlideRefs.value = [...context.allSlideRefs.value, slideRef.value];
    }
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
