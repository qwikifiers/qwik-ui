import { Signal } from '@builder.io/qwik';

export interface CarouselContext {
  // source of truth
  slideOffsetSig: Signal<number>;
  numSlidesSig: Signal<number>;
  spaceBetweenSlides: number;
  slideRefsArray: Signal<Array<Signal>>;

  /* 
    refs 
    (I don't like adding sig to refs 
    because we know they are signals in qwik)
  */
  viewportRef: Signal<HTMLDivElement | undefined>;
  containerRef: Signal<HTMLDivElement | undefined>;

  // animation
  transitionDurationSig: Signal<number>;

  // signal binds
  currentIndexSig: Signal<number>;

  // dragging
  isDraggingSig: Signal<boolean>;
  initialX: Signal<number>;
  initialTransformX: Signal<number>;
}
