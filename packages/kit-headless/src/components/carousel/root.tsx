import {
  type PropsOf,
  type Signal,
  Slot,
  component$,
  useContextProvider,
  useSignal,
  useComputed$,
  useId,
} from '@builder.io/qwik';
import { CarouselContext, carouselContextId } from './context';

export type CarouselRootProps = PropsOf<'section'> & {
  gap?: number;
  'bind:currSlideIndex'?: Signal<number>;
  slidesPerView?: number;
  numSlides?: number;
  draggable?: boolean;
  align?: 'start' | 'center' | 'end';
  loop?: boolean;
  isTitle?: boolean;
};

export const CarouselBase = component$(
  ({
    'bind:currSlideIndex': givenSlideIndexSig,
    isTitle,
    ...props
  }: CarouselRootProps) => {
    // core state
    const localId = useId();
    const slideOffsetSig = useSignal<number>(0);
    const transitionDurationSig = useSignal<number>(0);
    const containerRef = useSignal<HTMLDivElement>();
    const nextButtonRef = useSignal<HTMLButtonElement>();
    const prevButtonRef = useSignal<HTMLButtonElement>();
    const isMouseDraggingSig = useSignal<boolean>(false);
    const initialX = useSignal<number>(0);
    const initialTransformX = useSignal<number>(0);
    const slideRefsArray = useSignal<Array<Signal>>([]);
    const bulletRefsArray = useSignal<Array<Signal>>([]);
    const defaultIndexSig = useSignal(0);
    const currentIndexSig = givenSlideIndexSig ? givenSlideIndexSig : defaultIndexSig;
    const isScrollerSig = useSignal(false);

    // derived
    const numSlidesSig = useComputed$(() => props.numSlides ?? 0);
    const isDraggableSig = useComputed$(() => props.draggable ?? true);
    const slidesPerViewSig = useComputed$(() => props.slidesPerView ?? 1);
    const gapSig = useComputed$(() => props.gap ?? 0);
    const alignSig = useComputed$(() => props.align ?? 'start');
    const isLoopSig = useComputed$(() => props.loop ?? false);
    const titleId = `${localId}-title`;

    const context: CarouselContext = {
      isLoopSig,
      alignSig,
      isDraggableSig,
      isMouseDraggingSig,
      slideOffsetSig,
      currentIndexSig,
      numSlidesSig,
      transitionDurationSig,
      containerRef,
      gapSig,
      initialX,
      initialTransformX,
      slideRefsArray,
      bulletRefsArray,
      slidesPerViewSig,
      nextButtonRef,
      prevButtonRef,
      isScrollerSig,
      localId,
    };

    useContextProvider(carouselContextId, context);

    return (
      <div
        role="group"
        aria-roledescription="carousel"
        aria-live="polite"
        data-qui-carousel
        aria-labelledby={isTitle ? titleId : undefined}
        aria-label={!isTitle ? `content slideshow` : undefined}
        {...props}
      >
        <Slot />
      </div>
    );
  },
);
