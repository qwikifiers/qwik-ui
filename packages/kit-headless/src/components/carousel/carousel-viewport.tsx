import { component$, QwikIntrinsicElements, Slot, useContext, $ } from '@builder.io/qwik';
import CarouselContextId from './carousel-context-id';

type CarouselViewportProps = QwikIntrinsicElements['div'];

export const CarouselView = component$((props: CarouselViewportProps) => {
  const context = useContext(CarouselContextId);

  const handlePointerMove$ = $((e: PointerEvent) => {
    if (context.isDraggingSig.value) {
      if (!context.containerRef.value) {
        return;
      }

      const deltaX = e.clientX - context.initialX.value;

      context.slideOffsetSig.value = context.initialTransformX.value + deltaX;
    }
  });

  return (
    <div
      onPointerDown$={(e) => {
        context.initialX.value = e.clientX;
        if (context.containerRef.value) {
          const style = window.getComputedStyle(context.containerRef.value);
          const matrix = new DOMMatrix(style.transform);
          context.initialTransformX.value = matrix.m41;

          console.log('Pointer down');
          context.isDraggingSig.value = true;
        }

        window.addEventListener('pointermove', handlePointerMove$);
      }}
      /* removes pointer move event from pointer up created in slide.tsx */
      window:onPointerUp$={() =>
        window.removeEventListener('pointermove', handlePointerMove$)
      }
      ref={context.viewportRef}
      style={{ overflow: 'hidden', position: 'relative' }}
      onTransitionEnd$={() => (context.transitionDurationSig.value = 0)}
      {...props}
    >
      <Slot />
    </div>
  );
});
