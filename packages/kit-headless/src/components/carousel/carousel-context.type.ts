import { Signal } from '@builder.io/qwik';

export interface CarouselContext {
  // user's source of truth
  currentSlideSig: Signal<number>;
  viewportRef: Signal<HTMLDivElement | undefined>;
  slideRef: Signal<HTMLDivElement | undefined>;
  slideOffset: Signal<number>;
  totalSlidesSig: Signal<number>;
  containerRef: Signal<HTMLDivElement | undefined>;
}
