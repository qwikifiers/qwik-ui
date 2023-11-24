import {
  QwikIntrinsicElements,
  Slot,
  component$,
  useContextProvider,
  useSignal,
} from '@builder.io/qwik';
import { CarouselContext } from './carousel-context.type';
import CarouselContextId from './carousel-context-id';

export type CarouselRootProps = QwikIntrinsicElements['section'] & {
  spaceBetween?: number;
};

export const Carousel = component$(
  ({ spaceBetween = 0, ...props }: CarouselRootProps) => {
    const currentSlideSig = useSignal(1);
    const viewportRef = useSignal<HTMLDivElement>();
    const containerRef = useSignal<HTMLDivElement>();
    const slideOffset = useSignal<number>(0);
    const slideRef = useSignal<HTMLDivElement>();
    const totalSlidesSig = useSignal<number>(0);
    const slidesArraySig = useSignal<Array<HTMLDivElement>>([]);
    const transitionDurationSig = useSignal<number>(0);

    const context: CarouselContext = {
      currentSlideSig,
      viewportRef,
      slideRef,
      slideOffset,
      totalSlidesSig,
      containerRef,
      spaceBetween,
      slidesArraySig,
      transitionDurationSig,
    };

    useContextProvider(CarouselContextId, context);

    return (
      <section {...props}>
        <Slot />
      </section>
    );
  },
);

/*

- carousel.tsx: This is the main Carousel component. It should include the logic for auto-rotation and stopping rotation when necessary. It should also manage the current slide state and pass it down to the necessary components.

*/
