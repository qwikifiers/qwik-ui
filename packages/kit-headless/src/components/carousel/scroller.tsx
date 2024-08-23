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
  const startPositionSig = useSignal<number>();
  const scrollInDirectionSig = useSignal(0);
  const isMouseDownSig = useSignal(false);
  const isMouseMovingSig = useSignal(false);
  const isTouchDeviceSig = useSignal(false);
  const isTouchMovingSig = useSignal(true);
  const isTouchStartSig = useSignal(false);
  const isHorizontal = context.directionSig.value === 'row';

  useTask$(() => {
    context.isScrollerSig.value = true;
  });

  const getSlidePosition$ = $((index: number) => {
    if (!context.scrollerRef.value) return 0;
    const container = context.scrollerRef.value;
    const slides = context.slideRefsArray.value;
    let position = 0;
    for (let i = 0; i < index; i++) {
      if (slides[i].value) {
        position +=
          slides[i].value.getBoundingClientRect()[isHorizontal ? 'width' : 'height'] +
          context.gapSig.value;
      }
    }
    const alignment = context.alignSig.value;
    if (alignment === 'center') {
      position -= isHorizontal
        ? (container.clientWidth - slides[index].value.getBoundingClientRect().width) / 2
        : (container.clientHeight - slides[index].value.getBoundingClientRect().height) /
          2;
    } else if (alignment === 'end') {
      position -= isHorizontal
        ? container.clientWidth - slides[index].value.getBoundingClientRect().width
        : container.clientHeight - slides[index].value.getBoundingClientRect().height;
    }

    return Math.max(0, position);
  });

  const handleMouseMove$ = $((e: MouseEvent) => {
    if (!isMouseDownSig.value || startPositionSig.value === undefined) return;
    if (!context.scrollerRef.value) return;
    const position = isHorizontal
      ? e.pageX - context.scrollerRef.value.offsetLeft
      : e.pageY - context.scrollerRef.value.offsetTop;
    const dragSpeed = 1.75;
    const walk = (position - startPositionSig.value) * dragSpeed;
    context.scrollerRef.value[isHorizontal ? 'scrollLeft' : 'scrollTop'] =
      scrollInDirectionSig.value - walk;
    isMouseMovingSig.value = true;
  });

  const handleMouseSnap$ = $(async () => {
    if (!context.scrollerRef.value) return;
    isMouseDownSig.value = false;
    window.removeEventListener('mousemove', handleMouseMove$);

    const container = context.scrollerRef.value;
    const slides = context.slideRefsArray.value;
    const containerScrollInDirection =
      container[isHorizontal ? 'scrollLeft' : 'scrollTop'];

    let closestIndex = 0;
    let minDistance = Infinity;

    for (let i = 0; i < slides.length; i++) {
      const slidePosition = await getSlidePosition$(i);
      const distance = Math.abs(containerScrollInDirection - slidePosition);
      if (distance < minDistance) {
        closestIndex = i;
        minDistance = distance;
      }
    }

    const dragSnapPosition = await getSlidePosition$(closestIndex);

    container.scrollTo({
      left: dragSnapPosition,
      top: dragSnapPosition,
      behavior: 'smooth',
    });

    context.currentIndexSig.value = closestIndex;
  });

  const handleMouseDown$ = $((e: MouseEvent) => {
    if (!context.isDraggableSig.value) return;
    if (!context.scrollerRef.value) return;
    if (context.initialIndex && context.scrollStartRef.value) {
      context.scrollStartRef.value.style.setProperty('--scroll-snap-align', 'none');
    }

    isMouseDownSig.value = true;
    startPositionSig.value = isHorizontal
      ? e.pageX - context.scrollerRef.value.offsetLeft
      : e.pageY - context.scrollerRef.value.offsetTop;
    scrollInDirectionSig.value =
      context.scrollerRef.value[isHorizontal ? 'scrollLeft' : 'scrollTop'];
    window.addEventListener('mousemove', handleMouseMove$);
    window.addEventListener('mouseup', handleMouseSnap$);
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

    context.scrollerRef.value.scrollTo({
      left: nonDragSnapPosition,
      top: nonDragSnapPosition,
      behavior: 'smooth',
    });

    window.removeEventListener('mousemove', handleMouseMove$);
  });

  const updateTouchDeviceIndex$ = $(() => {
    if (!context.scrollerRef.value) return;
    const container = context.scrollerRef.value;
    const containerScrollDirection = container[isHorizontal ? 'scrollLeft' : 'scrollTop'];
    const slides = context.slideRefsArray.value;

    let currentIndex = 0;
    let minDistance = Infinity;

    slides.forEach((slideRef, index) => {
      if (!slideRef.value) return;
      const slideInDirection = slideRef.value[isHorizontal ? 'offsetLeft' : 'offsetTop'];
      const distance = Math.abs(containerScrollDirection - slideInDirection);
      if (distance < minDistance) {
        minDistance = distance;
        currentIndex = index;
      }
    });

    if (context.currentIndexSig.value !== currentIndex) {
      context.currentIndexSig.value = currentIndex;
    }
  });

  // resize the snap point when the window resizes
  const handleResize = $(async () => {
    if (!context.scrollerRef.value) return;
    const newPosition = await getSlidePosition$(context.currentIndexSig.value);
    context.scrollerRef.value.scrollTo({
      left: newPosition,
      top: newPosition,
      behavior: 'auto',
    });
  });

  useOnWindow('resize', handleResize);

  return (
    <div
      ref={context.scrollerRef}
      onMouseDown$={[handleMouseDown$, props.onMouseDown$]}
      data-draggable={context.isDraggableSig.value ? '' : undefined}
      data-qui-carousel-scroller
      onScroll$={[
        $(
          () =>
            isTouchDeviceSig.value && isTouchMovingSig.value && updateTouchDeviceIndex$(),
        ),
        props.onScroll$,
      ]}
      onTouchMove$={() => {
        isTouchMovingSig.value = true;
      }}
      onTouchStart$={() => {
        isTouchStartSig.value = true;
      }}
      window:onTouchStart$={() => {
        isTouchMovingSig.value = false;
        isTouchDeviceSig.value = true;
      }}
      preventdefault:mousemove
      data-align={context.alignSig.value}
      data-initial-touch={isTouchStartSig.value ? '' : undefined}
      {...props}
    >
      <Slot />
    </div>
  );
});
