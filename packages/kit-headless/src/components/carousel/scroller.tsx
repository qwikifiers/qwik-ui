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
  const closestSlideRef = useSignal<HTMLDivElement>();
  const isMouseDownSig = useSignal(false);
  const isMouseMovingSig = useSignal(false);
  const isTouchDeviceSig = useSignal(false);
  const isTouchMovingSig = useSignal(true);

  const handleMouseMove$ = $((e: MouseEvent) => {
    if (!isMouseDownSig.value || startXSig.value === undefined) return;
    if (!context.containerRef.value) return;
    const x = e.pageX - context.containerRef.value.offsetLeft;
    const dragSpeed = 1.75;
    const walk = (x - startXSig.value) * dragSpeed;
    context.containerRef.value.scrollLeft = scrollLeftSig.value - walk;
    isMouseMovingSig.value = true;
  });

  const handleMouseSnap$ = $(() => {
    if (!context.containerRef.value) return;
    isMouseDownSig.value = false;
    window.removeEventListener('mousemove', handleMouseMove$);

    const container = context.containerRef.value;
    const slides = context.slideRefsArray.value;
    const containerScrollLeft = container.scrollLeft;

    let closestSlide = slides[0].value;
    let minDistance = Math.abs(containerScrollLeft - closestSlide.offsetLeft);

    slides.forEach((slideRef) => {
      if (!slideRef.value) return;
      const distance = Math.abs(containerScrollLeft - slideRef.value.offsetLeft);
      if (distance < minDistance) {
        closestSlide = slideRef.value;
        minDistance = distance;
      }
    });

    const slideWidth = closestSlide.getBoundingClientRect().width;
    const totalSlideWidth = slideWidth + context.gapSig.value;
    const dragSnapPosition =
      Math.round(containerScrollLeft / totalSlideWidth) * totalSlideWidth;

    container.scrollTo({
      left: dragSnapPosition,
      behavior: 'smooth',
    });

    const correctIndex = Math.round(dragSnapPosition / totalSlideWidth);
    context.currentIndexSig.value = correctIndex;
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

  useTask$(function snapWithoutDrag({ track }) {
    track(() => context.currentIndexSig.value);

    /** This task should only fire if anything other than drag changes the currentIndex */
    if (isMouseMovingSig.value) {
      isMouseMovingSig.value = false;
      return;
    }

    if (!context.containerRef.value || isServer) return;

    if (!closestSlideRef.value) {
      closestSlideRef.value =
        context.slideRefsArray.value[context.currentIndexSig.value]?.value;
    }

    if (!closestSlideRef.value) return;

    const slideWidth = closestSlideRef.value.getBoundingClientRect().width;
    const totalSlideWidth = slideWidth + context.gapSig.value;
    const nonDragSnapPosition = context.currentIndexSig.value * totalSlideWidth;

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
      style={{ gap: context.gapSig.value }}
      {...props}
    >
      <Slot />
    </div>
  );
});