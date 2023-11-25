import {
  component$,
  QwikIntrinsicElements,
  Slot,
  useContext,
  useSignal,
  $,
} from '@builder.io/qwik';
import CarouselContextId from './carousel-context-id';
import { getContainerTranslateX } from './utils';

type CarouselViewportProps = QwikIntrinsicElements['div'];

export const CarouselView = component$((props: CarouselViewportProps) => {
  const context = useContext(CarouselContextId);
  const initialX = useSignal<number>(0);

  const handlePointerMove$ = $((e: MouseEvent) => {
    if (!context.containerRef.value) {
      return;
    }

    context.slideOffsetSig.value = getContainerTranslateX(context.containerRef.value, e);
  });

  const handlePointerUp$ = $((e: MouseEvent) => {
    if (!context.containerRef.value) {
      return;
    }

    const containerTranslateX = getContainerTranslateX(context.containerRef.value, e);
    const absContainerTranslateX = Math.abs(containerTranslateX);

    context.allSlideRefs.value.find((slide, i) => {
      if (!context.viewportRef.value) {
        return;
      }

      const slideRightEdgePos =
        slide.offsetLeft + slide.offsetWidth + context.spaceBetweenSlides;

      const halfViewportWidth = context.viewportRef.value.offsetWidth / 2;

      const isWithinBounds =
        absContainerTranslateX > slide.offsetLeft - halfViewportWidth &&
        absContainerTranslateX < slideRightEdgePos - halfViewportWidth;

      if (isWithinBounds) {
        context.currentSlideSig.value = i + 1;
        context.slideOffsetSig.value = slide.offsetLeft * -1;
        context.transitionDurationSig.value = 300;
        return true;
      }

      return false;
    });

    window.removeEventListener('pointermove', handlePointerMove$);
  });

  return (
    <div
      onPointerDown$={(e) => {
        initialX.value = e.clientX;

        window.addEventListener('pointermove', handlePointerMove$);
        window.addEventListener('pointerup', handlePointerUp$, { once: true });
      }}
      ref={context.viewportRef}
      style={{ overflow: 'hidden', position: 'relative' }}
      onTransitionEnd$={() => (context.transitionDurationSig.value = 0)}
      {...props}
    >
      <Slot />
    </div>
  );
});
