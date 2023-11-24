import {
  QwikIntrinsicElements,
  Slot,
  component$,
  useContext,
  useTask$,
  useSignal,
  useOnWindow,
  $,
} from '@builder.io/qwik';
import CarouselContextId from './carousel-context-id';

export type CarouselSlideProps = QwikIntrinsicElements['div'];

import { isServer } from '@builder.io/qwik/build';

export const CarouselSlide = component$(({ ...props }: CarouselSlideProps) => {
  const context = useContext(CarouselContextId);
  const slideRef = useSignal<HTMLDivElement | undefined>();
  const isOnClientSig = useSignal<boolean>(false);

  useTask$(({ track }) => {
    track(() => isOnClientSig.value);

    if (isServer) {
      console.log('SERVER:', slideRef.value);
    }

    if (!slideRef.value) {
      return;
    }

    context.slidesArraySig.value = [...context.slidesArraySig.value, slideRef.value];
    context.totalSlidesSig.value++;
    console.log('slides array: ', context.slidesArraySig.value);
  });

  useOnWindow(
    'DOMContentLoaded',
    $(() => {
      isOnClientSig.value = true;
      console.log('CLIENT:', slideRef.value);
    }),
  );

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
