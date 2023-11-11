import { QwikIntrinsicElements, Slot, component$ } from '@builder.io/qwik';

export type CarouselSlideProps = QwikIntrinsicElements['div'];

export const CarouselSlide = component$(({ ...props }: CarouselSlideProps) => {
  return (
    <div {...props}>
      <Slot />
    </div>
  );
});

/*
    slide.tsx: This component represents an individual slide in the carousel. It should receive its content as a prop from the Carousel component.

*/
