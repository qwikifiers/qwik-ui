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

      context.slideOffset.value = containerTranslateX;
    }
  });

  const handlePointerUp$ = $((e: MouseEvent) => {
    if (context.containerRef.value && context.viewportRef.value) {
      const style = window.getComputedStyle(context.containerRef.value);
      const matrix = new DOMMatrix(style.transform);
      const containerTranslateX = matrix.m41 + e.movementX;

      for (let i = 0; i < context.slidesArraySig.value.length; i++) {
        const slide = context.slidesArraySig.value[i];
        const slideLeftOffset = slide.offsetLeft;
        const slideRightEdgePos =
          slideLeftOffset + slide.offsetWidth + context.spaceBetween;

        const halfViewportWidth = context.viewportRef.value?.offsetWidth / 2;
        const absContainerTranslateX = Math.abs(containerTranslateX);

        const isWithinLeftBound =
          absContainerTranslateX > slideLeftOffset - halfViewportWidth;

        const isWithinRightBound =
          absContainerTranslateX < slideRightEdgePos - halfViewportWidth;

        if (isWithinLeftBound && isWithinRightBound) {
          context.currentSlideSig.value = i + 1;
          context;
          context.slideOffset.value = slide.offsetLeft * -1;
          context.transitionDurationSig.value = 300;
          console.log(context.slideOffset.value);
          break;
        }
      }
    }

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
