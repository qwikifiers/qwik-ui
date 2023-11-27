import { Signal } from '@builder.io/qwik';

export interface CarouselContext {
  // source of truth
  slideOffsetSig: Signal<number>;
  numSlidesSig: Signal<number>;
  spaceBetweenSlides: number;

  /* 
    refs 
    (I don't like adding sig to refs 
    because we know they are signals in qwik)
  */
  viewportRef: Signal<HTMLDivElement | undefined>;
  containerRef: Signal<HTMLDivElement | undefined>;
  slideRef: Signal<HTMLDivElement | undefined>;
  allSlideRefs: Signal<Array<HTMLDivElement>>;

  // animation
  transitionDurationSig: Signal<number>;

  // signal binds
  moveToSig?: Signal<number | null>;
  currentIndexSig: Signal<number>;
}
