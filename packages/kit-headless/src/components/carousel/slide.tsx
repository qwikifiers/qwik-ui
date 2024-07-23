import {
  type PropsOf,
  Slot,
  component$,
  useContext,
  useTask$,
  useSignal,
  useComputed$,
} from '@builder.io/qwik';
import { carouselContextId } from './context';

export type CarouselSlideProps = PropsOf<'div'> & {
  _index?: number;
};

export const CarouselSlide = component$(({ _index, ...props }: CarouselSlideProps) => {
  const context = useContext(carouselContextId);
  const slideRef = useSignal<HTMLDivElement | undefined>();
  const isActiveSig = useComputed$(() => {
    return context.currentIndexSig.value === _index;
  });

  useTask$(function getIndexOrder() {
    if (_index !== undefined) {
      context.slideRefsArray.value[_index] = slideRef;
    } else {
      throw new Error('Qwik UI: Carousel Slide cannot find its proper index.');
    }
  });

  return (
    <div
      ref={slideRef}
      data-active={isActiveSig.value ? '' : undefined}
      inert={!isActiveSig.value}
      aria-roledescription="slide"
      data-qui-carousel-slide
      {...props}
    >
      <Slot />
    </div>
  );
});
