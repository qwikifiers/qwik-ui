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
  const transformSig = useSignal({ x: 0, y: 0, z: 0 });
  const isMouseDownSig = useSignal(false);
  const isMouseMovingSig = useSignal(false);
  const isTouchDeviceSig = useSignal(false);
  const isTouchMovingSig = useSignal(true);
  const isTouchStartSig = useSignal(false);
  const userDefinedTransitionSig = useSignal<string>();
  const isInitialTransitionSig = useSignal(true);

  useTask$(() => {
    context.isScrollerSig.value = true;
  });

  const updateTransform = $(() => {
    if (!context.scrollerRef.value) return;
    context.scrollerRef.value.style.setProperty(
      '--transform',
      `translate3d(${transformSig.value.x}px, ${transformSig.value.y}px, ${transformSig.value.z}px)`,
    );
  });

  const setTransition = $((useTransition: boolean) => {
    if (!context.scrollerRef.value) return;

    if (useTransition === false) {
      context.scrollerRef.value.style.transition = 'none';
      return;
    }

    if (isInitialTransitionSig.value) {
      userDefinedTransitionSig.value = getComputedStyle(
        context.scrollerRef.value,
      ).transition;

      isInitialTransitionSig.value = false;
    }

    context.scrollerRef.value.style.transition =
      userDefinedTransitionSig.value ?? 'revert';
  });

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

  const handleMouseMove$ = $(async (e: MouseEvent) => {
    if (!isMouseDownSig.value || startXSig.value === undefined) return;
    if (!context.scrollerRef.value) return;
    const x = e.pageX;
    const dragSpeed = 1.75;
    const walk = (startXSig.value - x) * dragSpeed;
    transformSig.value.x -= walk;
    await setTransition(false);
    requestAnimationFrame(updateTransform);

    startXSig.value = x;
    isMouseMovingSig.value = true;
  });

  const handleDragSnap$ = $(async () => {
    if (!context.scrollerRef.value) return;

    const slides = context.slideRefsArray.value;
    const viewportCenter = window.innerWidth / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i].value;
      if (!slide) continue;

      const slideRect = slide.getBoundingClientRect();
      const slideCenter = slideRect.left + slideRect.width / 2;
      const distanceToCenter = Math.abs(slideCenter - viewportCenter);

      if (distanceToCenter < minDistance) {
        closestIndex = i;
        minDistance = distanceToCenter;
      }
    }

    const dragSnapPosition = await getSlidePosition$(closestIndex);

    await setTransition(true);
    transformSig.value.x = -dragSnapPosition;
    requestAnimationFrame(updateTransform);

    context.currentIndexSig.value = closestIndex;
    isMouseDownSig.value = false;
    isMouseMovingSig.value = false;
    isTouchMovingSig.value = false;
    isTouchStartSig.value = false;
    window.removeEventListener('mousemove', handleMouseMove$);
  });

  const handleMouseDown$ = $(async (e: MouseEvent) => {
    if (!context.isDraggableSig.value) return;
    if (!context.scrollerRef.value) return;
    await setTransition(true);

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

    const currentIndex = context.currentIndexSig.value;
    const snapPosition = await getSlidePosition$(currentIndex);
    await setTransition(true);
    transformSig.value.x = -snapPosition;
    requestAnimationFrame(updateTransform);

    window.removeEventListener('mousemove', handleMouseMove$);
  });

  const handleResize$ = $(async () => {
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

    if (isCoarsePointer) return;

    await setTransition(true);

    if (!context.scrollerRef.value) return;
    const newPosition = await getSlidePosition$(context.currentIndexSig.value);
    transformSig.value.x = -newPosition;
    requestAnimationFrame(updateTransform);
    context.scrollerRef.value.style.transition = 'none';
  });

  const handleTouchStart$ = $(async (e: TouchEvent) => {
    if (!context.isDraggableSig.value || !context.scrollerRef.value) return;

    if (context.startIndex && context.scrollStartRef.value) {
      context.scrollStartRef.value.style.setProperty('--scroll-snap-align', 'none');
    }

    await setTransition(true);
    startXSig.value = e.touches[0].clientX;
    isTouchStartSig.value = true;
    isTouchMovingSig.value = false;
  });

  const handleTouchMove$ = $(async (e: TouchEvent) => {
    if (
      isMouseDownSig.value ||
      startXSig.value === undefined ||
      !context.scrollerRef.value
    )
      return;

    const x = e.touches[0].clientX;
    const dragSpeed = 1;
    const walk = (startXSig.value - x) * dragSpeed;
    const newTransform = transformSig.value.x - walk;

    // Limit the transform to prevent overscrolling
    const maxTransform = 0;
    const minTransform = -(
      context.scrollerRef.value.scrollWidth - context.scrollerRef.value.clientWidth
    );
    transformSig.value.x = Math.max(minTransform, Math.min(maxTransform, newTransform));

    await setTransition(false);
    requestAnimationFrame(updateTransform);
    startXSig.value = x;
    isTouchMovingSig.value = true;
  });

  useOnWindow('resize', handleResize$);

  return (
    <div
      data-qui-carousel-viewport
      onMouseDown$={[handleMouseDown$, props.onMouseDown$]}
      onTouchStart$={[handleTouchStart$, props.onTouchStart$]}
      onTouchMove$={[handleTouchMove$, props.onTouchMove$]}
      onTouchEnd$={[handleDragSnap$, props.onTouchEnd$]}
      preventdefault:touchstart
      preventdefault:touchmove
    >
      <div
        ref={context.scrollerRef}
        data-qui-carousel-scroller
        data-draggable={context.isDraggableSig.value ? '' : undefined}
        data-align={context.alignSig.value}
        data-initial-touch={isTouchStartSig.value ? '' : undefined}
        {...props}
      >
        <Slot />
      </div>
    </div>
  );
});
