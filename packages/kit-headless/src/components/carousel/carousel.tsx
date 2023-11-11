import {
  QwikIntrinsicElements,
  Slot,
  component$,
  useContextProvider,
  useSignal,
} from '@builder.io/qwik';
import { CarouselContext } from './carousel-context.type';
import CarouselContextId from './carousel-context-id';

export type CarouselRootProps = QwikIntrinsicElements['section'];

export const Carousel = component$((props: CarouselRootProps) => {
  const currentSlideSig = useSignal(0);

  const context: CarouselContext = {
    currentSlideSig,
  };

  useContextProvider(CarouselContextId, context);

  return (
    <section {...props}>
      <Slot />
    </section>
  );
});

/*

- carousel.tsx: This is the main Carousel component. It should include the logic for auto-rotation and stopping rotation when necessary. It should also manage the current slide state and pass it down to the necessary components.

*/
