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
      test
    </div>
  );
});
