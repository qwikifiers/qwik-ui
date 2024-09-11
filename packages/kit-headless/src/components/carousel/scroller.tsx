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

    return Math.max(0, position);
  });

  const handleMouseMove$ = $((e: MouseEvent) => {
    if (!isMouseDownSig.value || startXSig.value === undefined) return;
    if (!context.scrollerRef.value) return;
    const x = e.pageX;
    const dragSpeed = 1.75;
    const walk = (startXSig.value - x) * dragSpeed;
    console.log(startXSig.value);
    const newTransform = transformLeftSig.value - walk;
    console.log('TRANSFORM LEFT: ', transformLeftSig.value);
    context.scrollerRef.value.style.transform = `translate3d(${newTransform}px, 0, 0)`;
    context.scrollerRef.value.style.transition = 'none';
    isMouseMovingSig.value = true;
  });

  const handleDragSnap$ = $(async () => {
    if (!context.scrollerRef.value) return;

    const computedTransform = getComputedStyle(context.scrollerRef.value).transform;

    transformLeftSig.value =
      computedTransform === 'none' ? 0 : parseInt(computedTransform.split(',')[4]) || 0;

    isMouseDownSig.value = false;
    window.removeEventListener('mousemove', handleMouseMove$);

    const container = context.scrollerRef.value;
    const slides = context.slideRefsArray.value;
    const containerScrollLeft = container.scrollLeft;
    const containerWidth = container.clientWidth;
    const alignment = context.alignSig.value;

    let closestIndex = 0;
    let minDistance = Infinity;

    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i].value;
      if (!slide) continue;
      const slideRect = slide.getBoundingClientRect();
      let slidePosition = slide.offsetLeft - container.offsetLeft;

      // Adjust slidePosition based on alignment
      if (alignment === 'center') {
        slidePosition -= (containerWidth - slideRect.width) / 2;
      } else if (alignment === 'end') {
        slidePosition -= containerWidth - slideRect.width;
      }

      const distance = Math.abs(containerScrollLeft - slidePosition);
      if (distance < minDistance) {
        closestIndex = i;
        minDistance = distance;
      }
    }

    const dragSnapPosition = await getSlidePosition$(closestIndex);
    container.style.transition = 'transform 0.3s ease-out';
    container.style.transform = `translate3d(${-dragSnapPosition}px, 0, 0)`;
    transformLeftSig.value = -dragSnapPosition;

    context.currentIndexSig.value = closestIndex;
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

    // const nonDragSnapPosition = await getSlidePosition$(context.currentIndexSig.value);

    if (isMouseDownSig.value) return;

    // context.scrollerRef.value.scrollTo({ left: nonDragSnapPosition, behavior: 'smooth' });

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
