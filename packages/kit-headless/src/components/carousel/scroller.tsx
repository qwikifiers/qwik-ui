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

type CarouselContainerProps = PropsOf<'div'>;

export const CarouselScroller = component$((props: CarouselContainerProps) => {
  const context = useContext(carouselContextId);
  useStyles$(styles);
  const isMouseDownSig = useSignal(false);
  const startXSig = useSignal<number>();
  const scrollLeftSig = useSignal(0);
  const closestSlideRef = useSignal<HTMLDivElement>();

  const handleMouseMove$ = $((e: MouseEvent) => {
    if (!isMouseDownSig.value || startXSig.value === undefined) return;
    if (!context.containerRef.value) return;
    const x = e.pageX - context.containerRef.value.offsetLeft;
    const SCROLL_SPEED = 1.75;
    const walk = (x - startXSig.value) * SCROLL_SPEED;
    context.containerRef.value.scrollLeft = scrollLeftSig.value - walk;
  });

  const handleMouseDown$ = $((e: MouseEvent) => {
    if (!context.isDraggableSig.value) return;
    if (!context.containerRef.value) return;
    isMouseDownSig.value = true;
    startXSig.value = e.pageX - context.containerRef.value.offsetLeft;
    scrollLeftSig.value = context.containerRef.value.scrollLeft;
    window.addEventListener('mousemove', handleMouseMove$);
  });

  const handleMouseSnap$ = $(() => {
    if (!context.containerRef.value) return;
    isMouseDownSig.value = false;
    window.removeEventListener('mousemove', handleMouseMove$);

    const container = context.containerRef.value;
    const slides = context.slideRefsArray.value;
    const containerScrollLeft = container.scrollLeft;

    const closestSlide = slides[0].value;
    closestSlideRef.value = closestSlide;
    context.currentIndexSig.value = 0;
    let minDistance = Math.abs(containerScrollLeft - closestSlide.offsetLeft);

    slides.forEach((slideRef, index) => {
      if (!slideRef.value) return;
      const distance = Math.abs(containerScrollLeft - slideRef.value.offsetLeft);
      if (distance < minDistance) {
        closestSlideRef.value = slideRef.value;
        context.currentIndexSig.value = index;
        minDistance = distance;
      }
    });
  });

  useTask$(({ track }) => {
    track(() => context.currentIndexSig.value);

    if (!closestSlideRef.value || !context.containerRef.value) return;

    const slideWidth = closestSlideRef.value.getBoundingClientRect().width;
    const slideMarginLeft = parseFloat(
      getComputedStyle(closestSlideRef.value).marginLeft,
    );
    const slideMarginRight = parseFloat(
      getComputedStyle(closestSlideRef.value).marginRight,
    );
    const totalSlideWidth = slideWidth + slideMarginLeft + slideMarginRight;
    const snapPosition = context.currentIndexSig.value * totalSlideWidth;

    context.containerRef.value.scrollTo({
      left: snapPosition,
      behavior: 'smooth',
    });
  });

  return (
    <div
      ref={context.containerRef}
      onMouseDown$={[handleMouseDown$, props.onMouseDown$]}
      window:onMouseUp$={[handleMouseSnap$, props['window:onPointerUp$']]}
      data-draggable={context.isDraggableSig.value ? '' : undefined}
      data-qui-carousel-container
      preventdefault:mousemove
      {...props}
    >
      <Slot />
    </div>
  );
});
