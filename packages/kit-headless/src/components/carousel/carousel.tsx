import {
  type PropsOf,
  type Signal,
  Slot,
  component$,
  useContextProvider,
  useSignal,
} from '@builder.io/qwik';
import { type CarouselContext } from './carousel-context.type';
import CarouselContextId from './carousel-context-id';
import { VisuallyHidden } from '../../utils/visually-hidden';

export type CarouselRootProps = PropsOf<'section'> & {
  spaceBetweenSlides?: number;
  'bind:currSlideIndex'?: Signal<number>;
};

export const HCarousel = component$(
  ({
    spaceBetweenSlides = 0,
    'bind:currSlideIndex': givenSlideIndexSig,
    ...props
  }: CarouselRootProps) => {
    const defaultIndexSig = useSignal(0);
    const currentIndexSig = givenSlideIndexSig ? givenSlideIndexSig : defaultIndexSig;

    const slideOffsetSig = useSignal<number>(0);
    const numSlidesSig = useSignal<number>(0);
    const transitionDurationSig = useSignal<number>(0);
    const viewportRef = useSignal<HTMLDivElement>();
    const containerRef = useSignal<HTMLDivElement>();
    const isDraggingSig = useSignal<boolean>(false);
    const initialX = useSignal<number>(0);
    const initialTransformX = useSignal<number>(0);
    const slideRefsArray = useSignal<Array<Signal>>([]);

    const context: CarouselContext = {
      slideOffsetSig,
      currentIndexSig,
      numSlidesSig,
      transitionDurationSig,
      viewportRef,
      containerRef,
      spaceBetweenSlides,
      isDraggingSig,
      initialX,
      initialTransformX,
      slideRefsArray,
    };

    useContextProvider(CarouselContextId, context);

    return (
      <section data-qui-carousel aria-roledescription="carousel" role="group" {...props}>
        <VisuallyHidden aria-live="polite" aria-atomic="true">
          Slide {context.currentIndexSig.value} of
          {context.numSlidesSig.value}
        </VisuallyHidden>
        <Slot />
      </section>
    );
  },
);
