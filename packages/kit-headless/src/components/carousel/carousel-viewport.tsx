import { component$, QwikIntrinsicElements, Slot, useContext } from '@builder.io/qwik';
import CarouselContextId from './carousel-context-id';

type CarouselViewportProps = QwikIntrinsicElements['div'];

export const CarouselView = component$((props: CarouselViewportProps) => {
  const context = useContext(CarouselContextId);

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
      }}
      window:onPointerMove$={(e) => {
        if (context.isDraggingSig.value) {
          if (!context.containerRef.value) {
            return;
          }

          const deltaX = e.clientX - context.initialX.value;

          context.slideOffsetSig.value = context.initialTransformX.value + deltaX;
        }
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
