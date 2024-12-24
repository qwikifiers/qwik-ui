import {
  type PropsOf,
  type Signal,
  Slot,
  component$,
  useContextProvider,
  useSignal,
  useComputed$,
  useId,
  useTask$,
} from '@builder.io/qwik';
import { CarouselContext, carouselContextId } from './context';
import { useBoundSignal } from '../../utils/bound-signal';
import { useAutoplay } from './use-carousel';

export type PublicCarouselRootProps = PropsOf<'div'> & {
  /** The gap between slides */
  gap?: number;

  /** Number of slides to show at once */
  slidesPerView?: number;

  /** Whether the carousel is draggable */
  draggable?: boolean;

  /** Alignment of slides within the viewport */
  align?: 'start' | 'center' | 'end';

  /** Whether the carousel should rewind */
  rewind?: boolean;

  /** Bind the selected index to a signal */
  'bind:selectedIndex'?: Signal<number>;

  /** change the initial index of the carousel on render */
  startIndex?: number;

  /**
   * @deprecated Use bind:selectedIndex instead
   * Bind the current slide index to a signal
   */
  'bind:currSlideIndex'?: Signal<number>;

  /** Whether the carousel should autoplay */
  'bind:autoplay'?: Signal<boolean>;

  /** the current progress of the carousel */
  'bind:progress'?: Signal<number>;

  /** Time in milliseconds before the next slide plays during autoplay */
  autoPlayIntervalMs?: number;

  /** @internal Total number of slides */
  _numSlides?: number;

  /** @internal Whether this carousel has a title */
  _isTitle?: boolean;

  /** The sensitivity of the carousel dragging */
  sensitivity?: {
    mouse?: number;
    touch?: number;
  };

  /** The amount of slides to move when hitting the next or previous button */
  move?: number;

  /** The carousel's direction */
  orientation?: 'horizontal' | 'vertical';

  /** The maximum height of the slides. Needed in vertical carousels */
  maxSlideHeight?: number;

  /** Whether the carousel should support mousewheel navigation */
  mousewheel?: boolean;
};

export const CarouselBase = component$((props: PublicCarouselRootProps) => {
  const {
    align,
    'bind:currSlideIndex': givenOldSlideIndexSig,
    'bind:selectedIndex': givenSlideIndexSig,
    'bind:autoplay': givenAutoplaySig,
    'bind:progress': givenProgressSig,
    _isTitle: isTitle,
    startIndex,
    ...rest
  } = props;

  /* we don't want to pass the align attribute to the carousel-root */
  align;

  // core state
  const localId = useId();
  const scrollerRef = useSignal<HTMLDivElement>();
  const nextButtonRef = useSignal<HTMLButtonElement>();
  const prevButtonRef = useSignal<HTMLButtonElement>();
  const scrollStartRef = useSignal<HTMLDivElement>();
  const isMouseDraggingSig = useSignal<boolean>(false);
  const slideRefsArray = useSignal<Array<Signal>>([]);
  const bulletRefsArray = useSignal<Array<Signal>>([]);
  const startIndexSig = useComputed$(() => {
    return startIndex ?? givenSlideIndexSig?.value ?? 0;
  });
  const currentIndexSig = useBoundSignal(
    givenSlideIndexSig ?? givenOldSlideIndexSig,
    startIndexSig.value,
  );
  const isScrollerSig = useSignal(false);
  const isAutoplaySig = useBoundSignal(givenAutoplaySig, false);

  const getInitialProgress = () => {
    return startIndexSig.value ? startIndexSig.value / ((props._numSlides ?? 1) - 1) : 0;
  };

  // derived
  const numSlidesSig = useComputed$(() => props._numSlides ?? 0);
  const isDraggableSig = useComputed$(() => props.draggable ?? true);
  const slidesPerViewSig = useComputed$(() => props.slidesPerView ?? 1);
  const gapSig = useComputed$(() => props.gap ?? 0);
  const alignSig = useComputed$(() => props.align ?? 'start');
  const isRewindSig = useComputed$(() => props.rewind ?? false);
  const autoPlayIntervalMsSig = useComputed$(() => props.autoPlayIntervalMs ?? 0);
  const progressSig = useBoundSignal(givenProgressSig, getInitialProgress());
  const sensitivitySig = useComputed$(() => {
    return {
      mouse: props.sensitivity?.mouse ?? 1.5,
      touch: props.sensitivity?.touch ?? 1.25,
    };
  });
  const moveSig = useComputed$(() => props.move ?? 1);
  const maxSlideHeightSig = useComputed$(() => props.maxSlideHeight ?? undefined);
  const orientationSig = useComputed$(() => {
    if (props.maxSlideHeight === undefined) {
      return 'horizontal';
    }
    return props.orientation ?? 'horizontal';
  });
  const isMouseWheelSig = useComputed$(() => props.mousewheel ?? false);

  const titleId = `${localId}-title`;

  const context: CarouselContext = {
    localId,
    scrollerRef,
    nextButtonRef,
    prevButtonRef,
    scrollStartRef,
    isMouseDraggingSig,
    isMouseWheelSig,
    slideRefsArray,
    bulletRefsArray,
    currentIndexSig,
    isScrollerSig,
    isAutoplaySig,
    numSlidesSig,
    isDraggableSig,
    slidesPerViewSig,
    gapSig,
    alignSig,
    isRewindSig,
    autoPlayIntervalMsSig,
    startIndexSig,
    sensitivitySig,
    moveSig,
    orientationSig,
    maxSlideHeightSig,
  };

  useAutoplay(context);

  useContextProvider(carouselContextId, context);

  useTask$(({ track }) => {
    if (!givenProgressSig) return;
    track(() => currentIndexSig.value);
    track(() => numSlidesSig.value);

    if (numSlidesSig.value > 1) {
      progressSig.value = (currentIndexSig.value / (numSlidesSig.value - 1)) * 100;
    } else {
      progressSig.value = 0;
    }
  });

  return (
    <div
      role="group"
      aria-labelledby={isTitle ? titleId : undefined}
      aria-label={!isTitle ? `content slideshow` : undefined}
      aria-roledescription="carousel"
      aria-live={isAutoplaySig.value ? 'off' : 'polite'}
      data-qui-carousel
      {...rest}
      style={{
        '--slides-per-view': slidesPerViewSig.value,
        '--gap': `${gapSig.value}px`,
        '--scroll-snap-align': alignSig.value,
        '--orientation': orientationSig.value === 'vertical' ? 'column' : 'row',
        '--max-slide-height': `${maxSlideHeightSig.value}px`,
      }}
    >
      <Slot />
    </div>
  );
});
