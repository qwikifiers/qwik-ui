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
    context.transitionDurationSig.value = 625;
  });

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
