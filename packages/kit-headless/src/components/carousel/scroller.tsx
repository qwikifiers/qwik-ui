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
  const isMouseDownSig = useSignal(false);
  const startXSig = useSignal<number>();
  const scrollLeftSig = useSignal(0);
  const closestSlideRef = useSignal<HTMLDivElement>();
  const wasMouseUpSig = useSignal(false);

  const handleMouseMove$ = $((e: MouseEvent) => {
    if (!isMouseDownSig.value || startXSig.value === undefined) return;
    if (!context.containerRef.value) return;
    const x = e.pageX - context.containerRef.value.offsetLeft;
    const SCROLL_SPEED = 1.75;
    const walk = (x - startXSig.value) * SCROLL_SPEED;
    context.containerRef.value.scrollLeft = scrollLeftSig.value - walk;
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
    const slideMarginLeft = parseFloat(getComputedStyle(closestSlide).marginLeft);
    const slideMarginRight = parseFloat(getComputedStyle(closestSlide).marginRight);
    const totalSlideWidth = slideWidth + slideMarginLeft + slideMarginRight;
    const snapPosition =
      Math.round(containerScrollLeft / totalSlideWidth) * totalSlideWidth;
    container.scrollTo({
      left: snapPosition,
      behavior: 'smooth',
    });

    wasMouseUpSig.value = true;
  });

  const handleMouseDown$ = $((e: MouseEvent) => {
    if (!context.isDraggableSig.value) return;
    if (!context.containerRef.value) return;
    isMouseDownSig.value = true;
    startXSig.value = e.pageX - context.containerRef.value.offsetLeft;
    scrollLeftSig.value = context.containerRef.value.scrollLeft;
    window.addEventListener('mousemove', handleMouseMove$);
    window.addEventListener('mouseup', handleMouseSnap$);
  });

  useTask$(function nonDraggingBehavior({ track }) {
    track(() => context.currentIndexSig.value);

    /** This task should only fire if anything other than drag changes the currentIndex */
    if (wasMouseUpSig.value) {
      wasMouseUpSig.value = false;
      return;
    }

    if (!context.containerRef.value || isServer) return;

    if (!closestSlideRef.value) {
      closestSlideRef.value = context.slideRefsArray.value[0].value;
    }

    if (!closestSlideRef.value) return;

    const slideWidth = closestSlideRef.value.getBoundingClientRect().width;
    const slideMarginLeft = parseFloat(
      getComputedStyle(closestSlideRef.value).marginLeft,
    );
    const slideMarginRight = parseFloat(
      getComputedStyle(closestSlideRef.value).marginRight,
    );
    const totalSlideWidth = slideWidth + slideMarginLeft + slideMarginRight;
    const snapPosition = context.currentIndexSig.value * totalSlideWidth;

    if (isMouseDownSig.value) return;

    context.containerRef.value.scrollTo({
      left: snapPosition,
      behavior: 'smooth',
    });

    window.removeEventListener('mousemove', handleMouseMove$);
  });

  return (
    <div
      ref={context.containerRef}
      onMouseDown$={[handleMouseDown$, props.onMouseDown$]}
      data-draggable={context.isDraggableSig.value ? '' : undefined}
      data-qui-carousel-container
      preventdefault:mousemove
      {...props}
    >
      <Slot />
    </div>
  );
});
