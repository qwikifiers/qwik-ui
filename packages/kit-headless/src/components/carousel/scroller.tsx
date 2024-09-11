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
  const transformLeftSig = useSignal(0);
  const isMouseDownSig = useSignal(false);
  const isMouseMovingSig = useSignal(false);
  const isTouchDeviceSig = useSignal(false);
  const isTouchMovingSig = useSignal(true);
  const isTouchStartSig = useSignal(false);
  const lastTouchX = useSignal(0);

  useTask$(() => {
    context.isScrollerSig.value = true;
  });

  const animationFrame = useSignal<number | null>(null);

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

    console.log(`getSlidePosition$ for index ${index}: ${position}`);
    return Math.max(0, position);
  });

  const handleMouseMove$ = $((e: MouseEvent) => {
    if (!isMouseDownSig.value || startXSig.value === undefined) return;
    if (!context.scrollerRef.value) return;
    const x = e.pageX;
    const dragSpeed = 1.75;
    const walk = (startXSig.value - x) * dragSpeed;
    transformLeftSig.value -= walk;
    context.scrollerRef.value.style.transform = `translate3d(${transformLeftSig.value}px, 0, 0)`;
    context.scrollerRef.value.style.transition = 'none';
    startXSig.value = x;
    isMouseMovingSig.value = true;
    console.log('Mouse move transform:', transformLeftSig.value);
  });

  const handleDragSnap$ = $(async () => {
    if (!context.scrollerRef.value) return;

    const container = context.scrollerRef.value;
    const slides = context.slideRefsArray.value;
    const containerRect = container.getBoundingClientRect();
    const viewportCenter = window.innerWidth / 2;

    console.log(
      'Container left:',
      containerRect.left,
      'Viewport center:',
      viewportCenter,
    );

    let closestIndex = 0;
    let minDistance = Infinity;

    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i].value;
      if (!slide) continue;

      const slideRect = slide.getBoundingClientRect();
      const slideCenter = slideRect.left + slideRect.width / 2;
      const distanceToCenter = Math.abs(slideCenter - viewportCenter);

      console.log(
        `Slide ${i}: center = ${slideCenter}, distance to viewport center = ${distanceToCenter}`,
      );

      if (distanceToCenter < minDistance) {
        closestIndex = i;
        minDistance = distanceToCenter;
      }
    }

    console.log('Closest index:', closestIndex, 'Min distance:', minDistance);

    const dragSnapPosition = await getSlidePosition$(closestIndex);
    console.log('Drag snap position:', dragSnapPosition);

    container.style.transition = 'transform 0.3s ease-out';
    container.style.transform = `translate3d(${-dragSnapPosition}px, 0, 0)`;
    transformLeftSig.value = -dragSnapPosition;

    context.currentIndexSig.value = closestIndex;
    isMouseDownSig.value = false;
    isMouseMovingSig.value = false;
    window.removeEventListener('mousemove', handleMouseMove$);
  });

  const handleMouseDown$ = $((e: MouseEvent) => {
    if (!context.isDraggableSig.value) return;
    if (!context.scrollerRef.value) return;
    if (context.startIndex && context.scrollStartRef.value) {
      context.scrollStartRef.value.style.setProperty('--scroll-snap-align', 'none');
    }

    isMouseDownSig.value = true;
    startXSig.value = e.pageX;
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

    if (isMouseDownSig.value) return;

    const container = context.scrollerRef.value;
    const currentIndex = context.currentIndexSig.value;

    console.log('Snap without drag - Current index:', currentIndex);

    const snapPosition = await getSlidePosition$(currentIndex);
    console.log('Snap without drag - Snap position:', snapPosition);

    container.style.transition = 'transform 0.3s ease-out';
    container.style.transform = `translate3d(${-snapPosition}px, 0, 0)`;
    transformLeftSig.value = -snapPosition;

    window.removeEventListener('mousemove', handleMouseMove$);
  });

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

  const handleTouchStart$ = $((e: TouchEvent) => {
    if (!context.isDraggableSig.value) return;
    isTouchStartSig.value = true;
    lastTouchX.value = e.touches[0].clientX;
  });

  const handleTouchMove$ = $((e: TouchEvent) => {
    if (!context.isDraggableSig.value || !context.scrollerRef.value) return;
    const touchX = e.touches[0].clientX;
    const diff = lastTouchX.value - touchX;
    context.scrollerRef.value.scrollLeft += diff;
    lastTouchX.value = touchX;
    isTouchMovingSig.value = true;
  });

  useOnWindow('resize', handleResize);

  useTask$(({ cleanup }) => {
    cleanup(() => {
      if (animationFrame.value !== null) {
        cancelAnimationFrame(animationFrame.value);
      }
    });
  });

  return (
    <div
      style={{ overflow: 'hidden' }}
      onMouseDown$={[handleMouseDown$, props.onMouseDown$]}
    >
      <div
        ref={context.scrollerRef}
        data-qui-carousel-scroller
        onTouchStart$={handleTouchStart$}
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
    </div>
  );
});
