import {
  QwikIntrinsicElements,
  Slot,
  component$,
  useContext,
  useTask$,
} from '@builder.io/qwik';
import CarouselContextId from './carousel-context-id';

export type CarouselSlideProps = QwikIntrinsicElements['div'];

export const CarouselSlide = component$(({ ...props }: CarouselSlideProps) => {
  const context = useContext(CarouselContextId);

  useTask$(() => {
    context.totalSlidesSig.value++;
    console.log(context.totalSlidesSig.value);
  });

  return (
    <div ref={context.slideRef} {...props}>
      <Slot />
    </div>
  );
});

/*
    slide.tsx: This component represents an individual slide in the carousel. It should receive its content as a prop from the Carousel component.

*/
