import { component$, type PropsOf, Slot, useContext, $ } from '@builder.io/qwik';
import { carouselContextId } from './context';

type CarouselViewportProps = PropsOf<'div'>;

export const CarouselView = component$((props: CarouselViewportProps) => {
  const context = useContext(carouselContextId);

  const handlePointerMove$ = $((e: PointerEvent) => {
    if (context.isMouseDraggingSig.value) {
      if (!context.containerRef.value) {
        return;
      }

      context.transitionDurationSig.value = 0;

      const deltaX = e.clientX - context.initialX.value;

      // const containerWidth = context.containerRef.value.scrollWidth;
      const containerLeftOffset = context.initialTransformX.value + deltaX;

      if (containerLeftOffset > 50) {
        return;
      }

      // TODO: fix bug where pointer down before the animation ends (slow move)

      context.slideOffsetSig.value = containerLeftOffset;

      /* --- */

      /* TODO: Optimize this by checking prev and next of current slides first */
      for (let i = 0; i < context.slideRefsArray.value.length; i++) {
        const slideRef = context.slideRefsArray.value[i];

        if (!context.containerRef.value || !slideRef.value) {
          return;
        }

        /*
            TODO: figure out why a separate DOMMatrix is why dragging and the buttons work properly.
          */
        const style = window.getComputedStyle(context.containerRef.value);
        const matrix = new DOMMatrix(style.transform);

        const containerTranslateX = matrix.m41;
        // How far to the left the slides container is shifted.
        const absContainerTranslateX = Math.abs(containerTranslateX);

        if (!context.viewportRef.value) {
          return;
        }

        // How far the left edge of this slide is from the left of the slides container.
        const slideSlideContainerLeftOffset = slideRef.value.offsetLeft;
        // How far the right edge of this slide is from the left of the slides container
        // (includes space between slide).
        const slideRightEdgePos =
          slideSlideContainerLeftOffset +
          slideRef.value.offsetWidth +
          context.spaceBetweenSlides;

        const carouselViewportWidth = context.viewportRef.value.offsetWidth;
        const halfViewportWidth = carouselViewportWidth / 2;

        const isWithinBounds =
          absContainerTranslateX > slideSlideContainerLeftOffset - halfViewportWidth &&
          absContainerTranslateX < slideRightEdgePos - halfViewportWidth;

        if (isWithinBounds) {
          context.currentIndexSig.value = i || 0;
          break;
        }
      }
    }
  });

  return (
    <div
      onPointerDown$={(e) => {
        if (!context.isDraggableSig.value) return;

        // Check if the device is a pointer device
        if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') {
          return;
        }

        context.initialX.value = e.clientX;
        if (context.containerRef.value) {
          const style = window.getComputedStyle(context.containerRef.value);
          const matrix = new DOMMatrix(style.transform);
          context.initialTransformX.value = matrix.m41;

          context.isMouseDraggingSig.value = true;
        }

        window.addEventListener('pointermove', handlePointerMove$);
      }}
      /* removes pointer move event from pointer up created in slide.tsx */
      window:onPointerUp$={() =>
        window.removeEventListener('pointermove', handlePointerMove$)
      }
      ref={context.viewportRef}
      style={{ overflowX: 'visible', position: 'relative' }}
      onTransitionEnd$={() => (context.transitionDurationSig.value = 0)}
      {...props}
    >
      <Slot />
    </div>
  );
});
