import {
  QwikIntrinsicElements,
  Signal,
  Slot,
  component$,
  useContextProvider,
  useOnWindow,
  useSignal,
  $,
} from '@builder.io/qwik';
import { CarouselContext } from './carousel-context.type';
import CarouselContextId from './carousel-context-id';
import { VisuallyHidden } from '../../utils/visually-hidden';

export type CarouselRootProps = QwikIntrinsicElements['section'] & {
  spaceBetweenSlides?: number;
  'bind:moveTo'?: Signal<number | null>;
  'bind:currSlideIndex'?: Signal<number | null>;
};

export const Carousel = component$(
  ({
    spaceBetweenSlides = 0,
    'bind:moveTo': givenMoveToSig,
    ...props
  }: CarouselRootProps) => {
    const moveToSig = givenMoveToSig;

    const slideOffsetSig = useSignal<number>(0);
    const currentSlideSig = useSignal(1);
    const numSlidesSig = useSignal<number>(0);
    const transitionDurationSig = useSignal<number>(0);
    const viewportRef = useSignal<HTMLDivElement>();
    const containerRef = useSignal<HTMLDivElement>();
    const slideRef = useSignal<HTMLDivElement>();
    const allSlideRefs = useSignal<Array<HTMLDivElement>>([]);

    const context: CarouselContext = {
      moveToSig,
      slideOffsetSig,
      currentSlideSig,
      numSlidesSig,
      transitionDurationSig,
      viewportRef,
      containerRef,
      slideRef,
      allSlideRefs,
      spaceBetweenSlides,
    };

    useContextProvider(CarouselContextId, context);

    useOnWindow(
      'resize',
      $((e) => {
        console.log(e);
      }),
    );

    return (
      <section aria-roledescription="carousel" role="group" {...props}>
        <VisuallyHidden aria-live="polite" aria-atomic="true">
          Slide {context.currentSlideSig.value} of
          {context.allSlideRefs.value.length}
        </VisuallyHidden>
        <Slot />
      </section>
    );
  },
);
