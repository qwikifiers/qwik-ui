import {
  component$,
  type PropsOf,
  Slot,
  useContext,
  useSignal,
  $,
  useTask$,
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

  useTask$(() => {
    context.isScrollerSig.value = true;
  });

  const getSlidePosition$ = $((index: number) => {
    if (!context.containerRef.value) return 0;
    const container = context.containerRef.value;
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
    if (!context.containerRef.value) return;
    const x = e.pageX - context.containerRef.value.offsetLeft;
    const dragSpeed = 1.75;
    const walk = (x - startXSig.value) * dragSpeed;
    context.containerRef.value.scrollLeft = scrollLeftSig.value - walk;
    isMouseMovingSig.value = true;
  });

  const handleMouseSnap$ = $(async () => {
    if (!context.containerRef.value) return;
    isMouseDownSig.value = false;
    window.removeEventListener('mousemove', handleMouseMove$);

    const container = context.containerRef.value;
    const slides = context.slideRefsArray.value;
    const containerScrollLeft = container.scrollLeft;

    let closestIndex = 0;
    let minDistance = Infinity;

    for (let i = 0; i < slides.length; i++) {
      const slidePosition = await getSlidePosition$(i);
      const distance = Math.abs(containerScrollLeft - slidePosition);
      if (distance < minDistance) {
        closestIndex = i;
        minDistance = distance;
      }
    }

    const dragSnapPosition = await getSlidePosition$(closestIndex);

    container.scrollTo({
      left: dragSnapPosition,
      behavior: 'smooth',
    });

    context.currentIndexSig.value = closestIndex;
  });

  const handleMouseDown$ = $((e: MouseEvent) => {
    if (!context.isDraggableSig.value) return;
    if (!context.containerRef.value) return;
    isMouseDownSig.value = true;
    startXSig.value = e.pageX - context.containerRef.value.offsetLeft;
    scrollLeftSig.value = context.containerRef.value.scrollLeft;
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

    if (!context.containerRef.value || isServer) return;

    const nonDragSnapPosition = await getSlidePosition$(context.currentIndexSig.value);

    if (isMouseDownSig.value) return;

    context.containerRef.value.scrollTo({
      left: nonDragSnapPosition,
      behavior: 'smooth',
    });

    window.removeEventListener('mousemove', handleMouseMove$);
  });

  const updateTouchDeviceIndex$ = $(() => {
    if (!context.containerRef.value) return;
    const container = context.containerRef.value;
    const containerScrollLeft = container.scrollLeft;
    const slides = context.slideRefsArray.value;

    let currentIndex = 0;
    let minDistance = Infinity;

    slides.forEach((slideRef, index) => {
      if (!slideRef.value) return;
      const slideLeft = slideRef.value.offsetLeft;
      const distance = Math.abs(containerScrollLeft - slideLeft);
      if (distance < minDistance) {
        minDistance = distance;
        currentIndex = index;
      }
    });

    if (context.currentIndexSig.value !== currentIndex) {
      context.currentIndexSig.value = currentIndex;
    }
  });

  return (
    <div
      ref={context.containerRef}
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
      onTouchMove$={() => (isTouchMovingSig.value = true)}
      window:onTouchStart$={() => {
        isTouchMovingSig.value = false;
        isTouchDeviceSig.value = true;
      }}
      preventdefault:mousemove
      data-align={context.alignSig.value}
      style={{ gap: context.gapSig.value }}
      {...props}
    >
      <Slot />
    </div>
  );
});
