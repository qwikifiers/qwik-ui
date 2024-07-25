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

export type CarouselRootProps = PropsOf<'div'> & {
  /** The gap between slides */
  gap?: number;

  /** Number of slides to show at once */
  slidesPerView?: number;

  /** Whether the carousel is draggable */
  draggable?: boolean;

  /** Alignment of slides within the viewport */
  align?: 'start' | 'center' | 'end';

  /** Whether the carousel should loop */
  loop?: boolean;

  /** Bind the selected index to a signal */
  'bind:selectedIndex'?: Signal<number>;

  /**
   * @deprecated Use bind:selectedIndex instead
   * Bind the current slide index to a signal
   */
  'bind:currSlideIndex'?: Signal<number>;

  /** @internal Total number of slides */
  _numSlides?: number;

  /** @internal Whether this carousel has a title */
  _isTitle?: boolean;
};

export const CarouselBase = component$(
  ({
    'bind:currSlideIndex': givenOldSlideIndexSig,
    'bind:selectedIndex': givenSlideIndexSig,
    _isTitle: isTitle,
    ...props
  }: CarouselRootProps) => {
    // core state
    const localId = useId();
    const scrollerRef = useSignal<HTMLDivElement>();
    const nextButtonRef = useSignal<HTMLButtonElement>();
    const prevButtonRef = useSignal<HTMLButtonElement>();
    const isMouseDraggingSig = useSignal<boolean>(false);
    const slideRefsArray = useSignal<Array<Signal>>([]);
    const bulletRefsArray = useSignal<Array<Signal>>([]);
    const defaultIndexSig = useSignal(0);
    const currentIndexSig =
      givenSlideIndexSig ?? givenOldSlideIndexSig ?? defaultIndexSig;
    const isScrollerSig = useSignal(false);

    // derived
    const numSlidesSig = useComputed$(() => props._numSlides ?? 0);
    const isDraggableSig = useComputed$(() => props.draggable ?? true);
    const slidesPerViewSig = useComputed$(() => props.slidesPerView ?? 1);
    const gapSig = useComputed$(() => props.gap ?? 0);
    const alignSig = useComputed$(() => props.align ?? 'start');
    const isLoopSig = useComputed$(() => props.loop ?? false);
    const titleId = `${localId}-title`;

    const context: CarouselContext = {
      localId,
      scrollerRef,
      nextButtonRef,
      prevButtonRef,
      isMouseDraggingSig,
      slideRefsArray,
      bulletRefsArray,
      currentIndexSig,
      isScrollerSig,
      numSlidesSig,
      isDraggableSig,
      slidesPerViewSig,
      gapSig,
      alignSig,
      isLoopSig,
    };

    useContextProvider(carouselContextId, context);

    return (
      <div
        role="group"
        aria-labelledby={isTitle ? titleId : undefined}
        aria-label={!isTitle ? `content slideshow` : undefined}
        aria-roledescription="carousel"
        aria-live="polite"
        data-qui-carousel
        {...props}
      >
        <Slot />
      </div>
    );
  },
);
