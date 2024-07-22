import {
  type PropsOf,
  type Signal,
  Slot,
  component$,
  useContextProvider,
  useSignal,
  useComputed$,
} from '@builder.io/qwik';
import { CarouselContext, carouselContextId } from './context';
import { VisuallyHidden } from '../../utils/visually-hidden';

export type CarouselRootProps = PropsOf<'section'> & {
  spaceBetweenSlides?: number;
  'bind:currSlideIndex'?: Signal<number>;
  slidesPerView?: number;
  draggable?: boolean;
  'bind:numBullets'?: Signal<number>;
};

export const CarouselBase = component$(
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
    const isMouseDraggingSig = useSignal<boolean>(false);
    const initialX = useSignal<number>(0);
    const initialTransformX = useSignal<number>(0);
    const slideRefsArray = useSignal<Array<Signal>>([]);
    const isDraggableSig = useComputed$(() => {
      return props.draggable ?? true;
    });
    const slidesPerViewSig = useComputed$(() => {
      return props.slidesPerView ?? 1;
    });

    const context: CarouselContext = {
      isDraggableSig,
      isMouseDraggingSig,
      slideOffsetSig,
      currentIndexSig,
      numSlidesSig,
      transitionDurationSig,
      viewportRef,
      containerRef,
      spaceBetweenSlides,
      initialX,
      initialTransformX,
      slideRefsArray,
      slidesPerViewSig,
    };

    useContextProvider(carouselContextId, context);

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
