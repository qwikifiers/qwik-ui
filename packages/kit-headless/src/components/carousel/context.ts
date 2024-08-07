import { createContextId } from '@builder.io/qwik';

export const carouselContextId = createContextId<CarouselContext>('carousel-context');

import { type Signal } from '@builder.io/qwik';

export interface CarouselContext {
  // core state
  localId: string;
  scrollerRef: Signal<HTMLDivElement | undefined>;
  scrollStartRef: Signal<HTMLDivElement | undefined>;
  nextButtonRef: Signal<HTMLButtonElement | undefined>;
  prevButtonRef: Signal<HTMLButtonElement | undefined>;
  isMouseDraggingSig: Signal<boolean>;
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
  isLoopSig: Signal<boolean>;
  autoPlayIntervalMsSig: Signal<number>;
  startIndex: number | undefined;
}
