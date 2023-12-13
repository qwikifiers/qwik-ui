import {
  component$,
  QwikIntrinsicElements,
  Slot,
  useContext,
  $,
  useSignal,
  useTask$,
} from '@builder.io/qwik';
import CarouselContextId from './carousel-context-id';

type CarouselViewportProps = QwikIntrinsicElements['div'];

import { isServer } from '@builder.io/qwik/build';

export const CarouselView = component$((props: CarouselViewportProps) => {
  const context = useContext(CarouselContextId);
  const newWidthSig = useSignal<number>();
  const hasResizeObserverSig = useSignal<boolean>(false);
  const checkWidth = useSignal<string>();

  // const lastViewportWidth = useSignal(0);

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

  const onResize$ = $(() => {
    if (!hasResizeObserverSig.value) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.contentBoxSize) {
            newWidthSig.value = entry.borderBoxSize[0].inlineSize;
            console.log(newWidthSig.value);
          }
        }
      });

      if (context.viewportRef.value) {
        resizeObserver.observe(context.viewportRef.value);
      }

      hasResizeObserverSig.value = true;
    }

    return newWidthSig.value;
  });

  useTask$(({ track }) => {
    track(() => checkWidth.value);

    if (isServer) return;

    onResize$();
  });

  useTask$(({ track }) => {
    track(() => checkWidth.value);

    if (isServer) return;

    checkWidth.value = context.viewportRef.value?.style.width;
  });

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

        console.log(
          context.slideRefsArray.value.map((slideRef) => slideRef.value.innerText),
        );
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
