import {
  QwikIntrinsicElements,
  Slot,
  component$,
  useContext,
  useSignal,
  useVisibleTask$,
} from '@builder.io/qwik';
import CarouselContextId from './carousel-context-id';

export type CarouselSlideProps = QwikIntrinsicElements['div'];

export const CarouselSlide = component$(({ ...props }: CarouselSlideProps) => {
  const context = useContext(CarouselContextId);
  const slideRef = useSignal<HTMLDivElement | undefined>();

  useVisibleTask$(({ track }) => {
    track(() => slideRef.value);

    if (!slideRef.value) {
      return;
    }

    context.totalSlidesSig.value++;
    context.slidesArraySig.value.push(slideRef.value);
    console.log('Adding slideRef:', slideRef.value?.innerText);
    console.log('hi');
  });

  return (
    <div style={{ marginRight: `${context.spaceBetween}px` }} ref={slideRef} {...props}>
      <Slot />
      test
    </div>
  );
});

/*
    slide.tsx: This component represents an individual slide in the carousel. It should receive its content as a prop from the Carousel component.

*/
