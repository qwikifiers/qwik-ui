import {
  component$,
  QwikIntrinsicElements,
  Slot,
  useContext,
  useSignal,
  $,
} from '@builder.io/qwik';
import CarouselContextId from './carousel-context-id';

type CarouselViewportProps = QwikIntrinsicElements['div'];

export const CarouselView = component$((props: CarouselViewportProps) => {
  const context = useContext(CarouselContextId);
  const initialX = useSignal<number>(0);

  const handlePointerMove$ = $((event: MouseEvent) => {
    if (context.containerRef.value && context.viewportRef.value) {
      const style = window.getComputedStyle(context.containerRef.value);
      const matrix = new DOMMatrix(style.transform);
      const containerTranslateX = matrix.m41 + event.movementX;

      context.slideOffsetSig.value = containerTranslateX;
    }
  });

  const handlePointerUp$ = $((e: MouseEvent) => {
    if (!context.containerRef.value) {
      return;
    }

    const style = window.getComputedStyle(context.containerRef.value);
    const matrix = new DOMMatrix(style.transform);
    const containerTranslateX = matrix.m41 + e.movementX;
    const absContainerTranslateX = Math.abs(containerTranslateX);

    context.allSlideRefs.value.find((slide, i) => {
      if (!context.viewportRef.value) {
        return;
      }

      const slideLeftOffset = slide.offsetLeft;
      const slideRightEdgePos =
        slideLeftOffset + slide.offsetWidth + context.spaceBetweenSlides;

      const halfViewportWidth = context.viewportRef.value?.offsetWidth / 2;

      const isWithinBounds =
        absContainerTranslateX > slideLeftOffset - halfViewportWidth &&
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
