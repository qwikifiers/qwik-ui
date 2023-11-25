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

export type CarouselSlideProps = QwikIntrinsicElements['div'];

export function useSlideOffset() {
  const context = useContext(CarouselContextId);

  return useComputed$(() => {
    const currIndex = context.currentSlideSig.value - 1;
    const slideElement = context.allSlideRefs.value[currIndex];
    return slideElement.offsetLeft * -1;
  });
}

export const CarouselSlide = component$(({ ...props }: CarouselSlideProps) => {
  const context = useContext(CarouselContextId);
  const slideRef = useSignal<HTMLDivElement | undefined>();
  const isOnClientSig = useSignal<boolean>(false);

  useComputed$(() => {
    // programmatically move slides
    const isSlideMoved = context.moveToSig?.value;

    if (isSlideMoved) {
      // unchanged if no moveToSig
      context.currentSlideSig.value =
        context.moveToSig?.value || context.currentSlideSig.value;

      const currIndex = context.currentSlideSig.value - 1;

      const movedSlideElement = context.allSlideRefs.value[currIndex];

      context.slideOffsetSig.value = movedSlideElement.offsetLeft * -1;

      context.transitionDurationSig.value = 625;
    }
  });

  useTask$(({ track }) => {
    track(() => isOnClientSig.value);

    if (!slideRef.value) {
      return;
    }

    // get all slide dimensions
    context.allSlideRefs.value = [...context.allSlideRefs.value, slideRef.value];
    context.numSlidesSig.value++;
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
