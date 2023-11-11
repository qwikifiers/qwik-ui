import { Signal } from '@builder.io/qwik';

export interface CarouselContext {
  // user's source of truth
  currentSlideSig: Signal<number>;
}
