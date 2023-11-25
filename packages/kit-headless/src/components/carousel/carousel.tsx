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
  spaceBetweenSlides?: number;
};

export const Carousel = component$(
  ({ spaceBetweenSlides = 0, ...props }: CarouselRootProps) => {
    const slideOffsetSig = useSignal<number>(0);
    const currentSlideSig = useSignal(1);
    const numSlidesSig = useSignal<number>(0);
    const transitionDurationSig = useSignal<number>(0);
    const viewportRef = useSignal<HTMLDivElement>();
    const containerRef = useSignal<HTMLDivElement>();
    const slideRef = useSignal<HTMLDivElement>();
    const allSlideRefs = useSignal<Array<HTMLDivElement>>([]);

    const context: CarouselContext = {
      slideOffsetSig,
      currentSlideSig,
      numSlidesSig,
      transitionDurationSig,
      viewportRef,
      containerRef,
      slideRef,
      allSlideRefs,
      spaceBetweenSlides,
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
