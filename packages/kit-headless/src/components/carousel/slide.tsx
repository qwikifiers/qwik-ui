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
      throw new Error('Qwik UI: Carousel component slide cannot find its proper index.');
    }
  });

  return (
    <div
      data-slide-num={_index}
      style={{ marginRight: `${context.spaceBetweenSlides}px` }}
      ref={slideRef}
      data-qui-carousel-slide
      {...props}
    >
      <Slot />
    </div>
  );
});
