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

export type CarouselRootProps = PropsOf<'section'> & {
  gap?: number;
  'bind:currSlideIndex'?: Signal<number>;
  slidesPerView?: number;
  numSlides?: number;
  draggable?: boolean;
  align?: 'start' | 'center' | 'end';
  loop?: boolean;
};

export const CarouselBase = component$(
  ({ 'bind:currSlideIndex': givenSlideIndexSig, ...props }: CarouselRootProps) => {
    const defaultIndexSig = useSignal(0);
    const currentIndexSig = givenSlideIndexSig ? givenSlideIndexSig : defaultIndexSig;

    const slideOffsetSig = useSignal<number>(0);
    const numSlidesSig = useComputed$(() => {
      return props.numSlides ?? 0;
    });
    const transitionDurationSig = useSignal<number>(0);
    const containerRef = useSignal<HTMLDivElement>();
    const nextButtonRef = useSignal<HTMLButtonElement>();
    const prevButtonRef = useSignal<HTMLButtonElement>();
    const isMouseDraggingSig = useSignal<boolean>(false);
    const initialX = useSignal<number>(0);
    const initialTransformX = useSignal<number>(0);
    const slideRefsArray = useSignal<Array<Signal>>([]);
    const bulletRefsArray = useSignal<Array<Signal>>([]);
    const isDraggableSig = useComputed$(() => {
      return props.draggable ?? true;
    });
    const slidesPerViewSig = useComputed$(() => {
      return props.slidesPerView ?? 1;
    });
    const gapSig = useComputed$(() => {
      return props.gap ?? 0;
    });
    const isScrollerSig = useSignal(false);
    const alignSig = useComputed$(() => {
      return props.align ?? 'start';
    });
    const isLoopSig = useComputed$(() => {
      return props.loop ?? false;
    });

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
    };

    useContextProvider(carouselContextId, context);

    return (
      <div data-qui-carousel aria-roledescription="carousel" role="group" {...props}>
        <Slot />
      </div>
    );
  },
);
