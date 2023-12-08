import {
  component$,
  QwikIntrinsicElements,
  Slot,
  useContext,
  $,
  useSignal,
} from '@builder.io/qwik';
import CarouselContextId from './carousel-context-id';

type CarouselViewportProps = QwikIntrinsicElements['div'];

export const CarouselView = component$((props: CarouselViewportProps) => {
  const context = useContext(CarouselContextId);

  const lastViewportWidth = useSignal(0);

  /* 

    1. native CSS solution

    container queries -> always check their container size.
    2. We can do that programmatically, by having a track on the container width.
    useTask$
    track(() => carouselViewport.style.width) -> make change to slide width (swiper does this)

    3. resize -> listens to window resize

    999999.
  */

  /*
    This is our backup solution if the above doesn't pan out. It has
    the disadvantage of loading and executing code on page load.
  */

  // useOnWindow(
  //   'DOMContentLoaded',
  //   $(() => {
  //     if (lastViewportWidth.value === 0) {
  //       lastViewportWidth.value =
  //         context.viewportRef.value?.getBoundingClientRect().width || 0;
  //     }

  //     console.log(
  //       'HERE:',
  //       context.viewportRef.value?.getBoundingClientRect().width,
  //       lastViewportWidth.value,
  //     );

  //     const resizeObserver = new ResizeObserver((entries) => {
  //       for (const entry of entries) {
  //         const contentRect = entry.contentRect;
  //         if (lastViewportWidth.value !== contentRect.width) {
  //           const delta = lastViewportWidth.value - contentRect.width;
  //           console.log('DELTA:', delta, contentRect.width);
  //           context.slideOffsetSig.value -= delta;
  //         }

  //         lastViewportWidth.value = contentRect.width;
  //       }
  //     });

  //     if (context.viewportRef.value) {
  //       resizeObserver.observe(context.viewportRef.value);
  //     }
  //   }),
  // );

  const handlePointerMove$ = $((e: PointerEvent) => {
    if (context.isDraggingSig.value) {
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
    }
  });

  return (
    <div
      onPointerDown$={(e) => {
        // Do nothing if this is not the primary button (e.g., right click).
        if (e.pointerType === 'mouse' && e.button !== 0) {
          return;
        }

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
