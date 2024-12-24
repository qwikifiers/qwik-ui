import { createContextId, type Signal } from '@builder.io/qwik';

export const carouselContextId = createContextId<CarouselContext>('qui-carousel-context');

export type CarouselContext = {
  // core state
  localId: string;
  scrollerRef: Signal<HTMLDivElement | undefined>;
  scrollStartRef: Signal<HTMLDivElement | undefined>;
  nextButtonRef: Signal<HTMLButtonElement | undefined>;
  prevButtonRef: Signal<HTMLButtonElement | undefined>;
  isMouseDraggingSig: Signal<boolean>;
  isMouseWheelSig: Signal<boolean>;
  slideRefsArray: Signal<Array<Signal>>;
  bulletRefsArray: Signal<Array<Signal>>;
  currentIndexSig: Signal<number>;
  isScrollerSig: Signal<boolean>;
  isAutoplaySig: Signal<boolean>;

  // derived
  numSlidesSig: Signal<number>;
  isDraggableSig: Signal<boolean>;
  slidesPerViewSig: Signal<number>;
  gapSig: Signal<number>;
  alignSig: Signal<'start' | 'center' | 'end'>;
  isRewindSig: Signal<boolean>;
  autoPlayIntervalMsSig: Signal<number>;
  startIndexSig: Signal<number>;
  sensitivitySig: Signal<{ mouse: number; touch: number }>;
  moveSig: Signal<number>;
  orientationSig: Signal<'horizontal' | 'vertical'>;
  maxSlideHeightSig: Signal<number | undefined>;
};
