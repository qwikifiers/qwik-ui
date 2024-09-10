import {
  component$,
  type PropsOf,
  Slot,
  useContext,
  useSignal,
  $,
  useTask$,
  useOnWindow,
} from '@builder.io/qwik';
import { carouselContextId } from './context';
import { useStyles$ } from '@builder.io/qwik';
import styles from './carousel.css?inline';
import { isServer } from '@builder.io/qwik/build';

type CarouselContainerProps = PropsOf<'div'>;

export const CarouselScroller = component$((props: CarouselContainerProps) => {
  const context = useContext(carouselContextId);
  useStyles$(styles);
  const startXSig = useSignal<number>();
  const scrollLeftSig = useSignal(0);
  const isMouseDownSig = useSignal(false);
  const isMouseMovingSig = useSignal(false);
  const isTouchDeviceSig = useSignal(false);
  const isTouchMovingSig = useSignal(true);
  const isTouchStartSig = useSignal(false);

  useTask$(() => {
    context.isScrollerSig.value = true;
  });

  const easeInOutCubic = $((t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  });

  const animateScroll$ = $(
    (startPosition: number, endPosition: number, duration: number) => {
      if (!context.scrollerRef.value) return;
      const container = context.scrollerRef.value;
      const distance = endPosition - startPosition;
      const startTime = performance.now();

      const animate = async (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        if (elapsedTime < duration) {
          const progress = await easeInOutCubic(elapsedTime / duration);
          container.scrollLeft = startPosition + distance * progress;
          requestAnimationFrame(animate);
        } else {
          container.scrollLeft = endPosition;
        }
      };

      requestAnimationFrame(animate);
    },
  );

  const getSlidePosition$ = $((index: number) => {
    if (!context.scrollerRef.value) return 0;
    const container = context.scrollerRef.value;
    const slides = context.slideRefsArray.value;
    let position = 0;
    for (let i = 0; i < index; i++) {
      if (slides[i].value) {
        position += slides[i].value.getBoundingClientRect().width + context.gapSig.value;
      }
    }

    const alignment = context.alignSig.value;
    if (alignment === 'center') {
      position -=
        (container.clientWidth - slides[index].value.getBoundingClientRect().width) / 2;
    } else if (alignment === 'end') {
      position -=
        container.clientWidth - slides[index].value.getBoundingClientRect().width;
    }

    return Math.max(0, position);
  });

  const handleMouseMove$ = $((e: MouseEvent) => {
    if (!isMouseDownSig.value || startXSig.value === undefined) return;
    if (!context.scrollerRef.value) return;
    const x = e.pageX - context.scrollerRef.value.offsetLeft;
    const dragSpeed = 1.75;
    const walk = (x - startXSig.value) * dragSpeed;
    context.scrollerRef.value.scrollLeft = scrollLeftSig.value - walk;
    isMouseMovingSig.value = true;
  });

  const handleDragSnap$ = $(() => {
    if (!context.scrollerRef.value) return;
    isMouseDownSig.value = false;
    window.removeEventListener('mousemove', handleMouseMove$);

    const container = context.scrollerRef.value;
    const slides = context.slideRefsArray.value;
    const containerScrollLeft = container.scrollLeft;

    let closestIndex = 0;
    let minDistance = Infinity;

    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i].value;
      if (!slide) continue;
      const slidePosition = slide.offsetLeft - container.offsetLeft;
      const distance = Math.abs(containerScrollLeft - slidePosition);
      if (distance < minDistance) {
        closestIndex = i;
        minDistance = distance;
      }
    }

    const targetSlide = slides[closestIndex].value;
    if (!targetSlide) return;

    const dragSnapPosition = targetSlide.offsetLeft - container.offsetLeft;

    container.scrollTo({
      left: dragSnapPosition,
      behavior: 'smooth',
    });

    context.currentIndexSig.value = closestIndex;
  });

  const handleMouseDown$ = $((e: MouseEvent) => {
    if (!context.isDraggableSig.value) return;
    if (!context.scrollerRef.value) return;
    if (context.startIndex && context.scrollStartRef.value) {
      context.scrollStartRef.value.style.setProperty('--scroll-snap-align', 'none');
    }

    isMouseDownSig.value = true;
    startXSig.value = e.pageX - context.scrollerRef.value.offsetLeft;
    scrollLeftSig.value = context.scrollerRef.value.scrollLeft;
    window.addEventListener('mousemove', handleMouseMove$);
    window.addEventListener('mouseup', handleDragSnap$);
    isMouseMovingSig.value = false;
  });

  useTask$(async function snapWithoutDrag({ track }) {
    track(() => context.currentIndexSig.value);

    if (isMouseMovingSig.value) {
      isMouseMovingSig.value = false;
      return;
    }

    if (isTouchDeviceSig.value && isTouchMovingSig.value) return;

    if (!context.scrollerRef.value || isServer) return;

    context.scrollStartRef.value?.style.setProperty('--scroll-snap-align', 'none');

    const nonDragSnapPosition = await getSlidePosition$(context.currentIndexSig.value);

    if (isMouseDownSig.value) return;

    const startPosition = context.scrollerRef.value.scrollLeft;
    await animateScroll$(startPosition, nonDragSnapPosition, 300);

    window.removeEventListener('mousemove', handleMouseMove$);
  });

  // resize the snap point when the window resizes
  const handleResize = $(async () => {
    if (!context.scrollerRef.value) return;
    const newPosition = await getSlidePosition$(context.currentIndexSig.value);
    context.scrollerRef.value.scrollTo({
      left: newPosition,
      behavior: 'auto',
    });
  });

  const handleWindowTouchStart$ = $(() => {
    isTouchMovingSig.value = false;
    isTouchDeviceSig.value = true;
  });

  const handleTouchMove$ = $(() => {
    isTouchMovingSig.value = true;
  });

  useOnWindow('resize', handleResize);

  return (
    <div
      ref={context.scrollerRef}
      data-qui-carousel-scroller
      onMouseDown$={[handleMouseDown$, props.onMouseDown$]}
      onTouchMove$={[handleTouchMove$, props.onTouchMove$]}
      onTouchEnd$={handleDragSnap$}
      data-draggable={context.isDraggableSig.value ? '' : undefined}
      window:onTouchStart$={[handleWindowTouchStart$, props['window:onTouchStart$']]}
      preventdefault:mousemove
      data-align={context.alignSig.value}
      data-initial-touch={isTouchStartSig.value ? '' : undefined}
      {...props}
    >
      <Slot />
    </div>
  );
});
