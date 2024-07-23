import {
  type PropsOf,
  Slot,
  component$,
  useContext,
  useTask$,
  useSignal,
} from '@builder.io/qwik';
import { carouselContextId } from './context';

export type CarouselSlideProps = PropsOf<'div'> & {
  _index?: number;
};

export const CarouselSlide = component$(({ _index, ...props }: CarouselSlideProps) => {
  const context = useContext(carouselContextId);
  const slideRef = useSignal<HTMLDivElement | undefined>();

  useTask$(function getIndexOrder() {
    if (_index !== undefined) {
      context.slideRefsArray.value[_index] = slideRef;
    } else {
      throw new Error('Qwik UI: Carousel Slide cannot find its proper index.');
    }

    context.numSlidesSig.value = context.slideRefsArray.value.length;
  });

  return (
    <div
      style={{ marginRight: `${context.gap}px` }}
      ref={slideRef}
      data-qui-carousel-slide
      {...props}
    >
      <Slot />
    </div>
  );
});
