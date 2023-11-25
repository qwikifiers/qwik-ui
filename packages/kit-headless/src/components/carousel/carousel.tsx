import {
  QwikIntrinsicElements,
  Slot,
  component$,
  useContextProvider,
  useSignal,
} from '@builder.io/qwik';
import { CarouselContext } from './carousel-context.type';
import CarouselContextId from './carousel-context-id';
import { VisuallyHidden } from '../../utils/visually-hidden';

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
      slideOffsetSig: slideOffset,
      numSlidesSig: totalSlidesSig,
      containerRef,
      spaceBetweenSlides: spaceBetween,
      allSlideRefs: slidesArraySig,
      transitionDurationSig,
    };

    useContextProvider(CarouselContextId, context);

    return (
      <section aria-roledescription="carousel" role="group" {...props}>
        <VisuallyHidden aria-live="polite" aria-atomic="true">
          Slide {context.currentSlideSig.value} of
          {context.allSlideRefs.value.length}
        </VisuallyHidden>
        <Slot />
      </section>
    );
  },
);
