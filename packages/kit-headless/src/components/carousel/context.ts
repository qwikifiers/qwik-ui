import { createContextId } from '@builder.io/qwik';

export const carouselContextId = createContextId<CarouselContext>('carousel-context');

import { type Signal } from '@builder.io/qwik';

export interface CarouselContext {
  alignSig: Signal<'start' | 'center' | 'end'>;
  isDraggableSig: Signal<boolean>;
  isScrollerSig: Signal<boolean>;
  isLoopSig: Signal<boolean>;
  localId: string;

  // source of truth
  slideOffsetSig: Signal<number>;
  numSlidesSig: Signal<number>;
  gapSig: Signal<number>;
  slidesPerViewSig: Signal<number>;
  slideRefsArray: Signal<Array<Signal>>;
  bulletRefsArray: Signal<Array<Signal>>;

  containerRef: Signal<HTMLDivElement | undefined>;
  nextButtonRef: Signal<HTMLButtonElement | undefined>;
  prevButtonRef: Signal<HTMLButtonElement | undefined>;

  // animation
  transitionDurationSig: Signal<number>;

  // signal binds
  currentIndexSig: Signal<number>;

  // dragging
  isMouseDraggingSig: Signal<boolean>;
  initialX: Signal<number>;
  initialTransformX: Signal<number>;
}
