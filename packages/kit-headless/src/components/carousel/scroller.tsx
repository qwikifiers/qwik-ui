import {
  component$,
  type PropsOf,
  useContext,
  $,
  useTask$,
  useOnWindow,
  Slot,
  useSignal,
} from '@builder.io/qwik';
import { carouselContextId } from './context';
import { useStyles$ } from '@builder.io/qwik';
import styles from './carousel.css?inline';
import { isServer } from '@builder.io/qwik/build';
import { useDebouncer } from '../../hooks/use-debouncer';
import { useScroller } from './use-scroller';
import { useCarousel } from './use-carousel';

export const CarouselScroller = component$((props: PropsOf<'div'>) => {
  useStyles$(styles);
  const context = useContext(carouselContextId);

  const { onMouseDown$, onTouchStart$, onTouchMove$, onTouchEnd$, ...rest } = props;

  const isMouseMovingSig = useSignal(false);
  const isTouchMovingSig = useSignal(true);
  const isTouchStartSig = useSignal(false);
  const initialLoadSig = useSignal(true);
  const isNewPosOnLoadSig = useSignal(false);

  const { validIndexesSig } = useCarousel(context);

  const {
    startPosSig,
    transformSig,
    boundariesSig,
    isMouseDownSig,
    isTouchDeviceSig,
    orientationProps,
    getSlidePosition,
    setBoundaries,
    setTransform,
    setTransition,
    setInitialSlidePos,
  } = useScroller(context);

  const { direction, pagePosition, clientPosition } =
    orientationProps[context.orientationSig.value];

  const handleMouseMove = $(async (e: MouseEvent) => {
    if (!isMouseDownSig.value || startPosSig.value === undefined) return;
    if (!context.scrollerRef.value || !boundariesSig.value) return;

    const pos = e[pagePosition];
    const dragSpeed = context.sensitivitySig.value.mouse;
    const walk = (startPosSig.value - pos) * dragSpeed;
    const newTransform = transformSig.value[direction] - walk;

    if (
      newTransform >= boundariesSig.value.min &&
      newTransform <= boundariesSig.value.max
    ) {
      transformSig.value[direction] = newTransform;

      await setTransition(false);
      await setTransform();
    }

    startPosSig.value = pos;
    isMouseMovingSig.value = true;
  });

  const handleDragSnap = $(async () => {
    if (!context.scrollerRef.value) return;

    const slides = context.slideRefsArray.value;
    const currentPosition = -transformSig.value[direction];

    let closestIndex = 0;
    let minDistance = Infinity;

    for (let i = 0; i < slides.length; i++) {
      const slide = slides[i].value;
      if (!slide) continue;

      const slidePosition = await getSlidePosition(i);
      const distance = Math.abs(slidePosition - currentPosition);

      if (distance < minDistance) {
        closestIndex = i;
        minDistance = distance;
      }
    }

    const dragSnapPosition = await getSlidePosition(closestIndex);

    await setTransition(true);
    transformSig.value[direction] = -dragSnapPosition;
    await setTransform();

    context.currentIndexSig.value = closestIndex;
    isMouseDownSig.value = false;
    isMouseMovingSig.value = false;
    isTouchMovingSig.value = false;
    isTouchStartSig.value = false;
    window.removeEventListener('mousemove', handleMouseMove);
  });

  const handleMouseDown = $(async (e: MouseEvent) => {
    if (!context.isDraggableSig.value) return;
    if (!context.scrollerRef.value) return;
    await setTransition(true);

    if (context.startIndexSig.value && context.scrollStartRef.value) {
      context.scrollStartRef.value.style.setProperty('--scroll-snap-align', 'none');
    }

    await setBoundaries();

    isMouseDownSig.value = true;
    startPosSig.value = e.pageX;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleDragSnap);
    isMouseMovingSig.value = false;
  });

  useTask$(async function nonDragSnap({ track }) {
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
    const snapPosition = await getSlidePosition(currentIndex);
    await setTransition(true);
    transformSig.value[direction] = -snapPosition;
    await setTransform();

    window.removeEventListener('mousemove', handleMouseMove);
  });

  const handleResize = $(async () => {
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

    if (isCoarsePointer) return;

    await setTransition(true);

    if (!context.scrollerRef.value) return;

    const newPosition = await getSlidePosition(context.currentIndexSig.value);
    transformSig.value.x = -newPosition;

    await setTransform();
    context.scrollerRef.value.style.transition = 'none';
  });

  const handleTouchStart = $(async (e: TouchEvent) => {
    if (!context.isDraggableSig.value || !context.scrollerRef.value) return;

    if (context.startIndexSig.value && context.scrollStartRef.value) {
      context.scrollStartRef.value.style.setProperty('--scroll-snap-align', 'none');
    }

    startPosSig.value = e.touches[0][clientPosition];
    isTouchStartSig.value = true;
    isTouchMovingSig.value = false;

    await setBoundaries();
    await setTransition(false);
  });

  const debouncedUpdate = useDebouncer(setTransform, 1);
  const handleTouchMove = $(async (e: TouchEvent) => {
    if (isMouseDownSig.value || startPosSig.value === undefined) return;
    if (!context.scrollerRef.value || !boundariesSig.value) return;

    const pos = e.touches[0][clientPosition];
    const dragSpeed = context.sensitivitySig.value.touch;

    const walk = (startPosSig.value - pos) * dragSpeed;
    const newTransform = transformSig.value[direction] - walk;

    if (
      newTransform >= boundariesSig.value.min &&
      newTransform <= boundariesSig.value.max
    ) {
      transformSig.value[direction] = newTransform;
      await debouncedUpdate();
    }

    startPosSig.value = pos;
    isTouchMovingSig.value = true;
  });

  useOnWindow('resize', handleResize);

  useTask$(() => {
    if (!initialLoadSig.value) return;
    isNewPosOnLoadSig.value =
      context.startIndexSig.value !== 0 &&
      context.startIndexSig.value !== undefined &&
      context.currentIndexSig.value !== 0;
  });

  const handleWheel = $(async (e: WheelEvent) => {
    if (!context.isDraggableSig.value || !context.scrollerRef.value) return;
    if (!context.isMouseWheelSig.value) return;

    const validIndexes = validIndexesSig.value;
    const currentIndex = context.currentIndexSig.value;
    const currentPosition = validIndexes.indexOf(currentIndex);
    const direction = e.deltaY > 0 ? 1 : -1;

    // check if in bounds
    const newPosition = Math.max(
      0,
      Math.min(currentPosition + direction, validIndexes.length - 1),
    );
    context.currentIndexSig.value = validIndexes[newPosition];
  });

  useTask$(() => {
    initialLoadSig.value = false;
  });

  return (
    <div
      data-qui-carousel-viewport
      onMouseDown$={[handleMouseDown, onMouseDown$]}
      onTouchStart$={[handleTouchStart, onTouchStart$]}
      onTouchMove$={[handleTouchMove, onTouchMove$]}
      onTouchEnd$={[handleDragSnap, onTouchEnd$]}
      preventdefault:touchstart
      preventdefault:touchmove
      onQVisible$={isNewPosOnLoadSig.value ? setInitialSlidePos : undefined}
      onWheel$={handleWheel}
      preventdefault:wheel
    >
      <div
        ref={context.scrollerRef}
        data-qui-carousel-scroller
        data-draggable={context.isDraggableSig.value ? '' : undefined}
        data-align={context.alignSig.value}
        data-initial-touch={isTouchStartSig.value ? '' : undefined}
        data-initial={isNewPosOnLoadSig.value ? '' : undefined}
        {...rest}
      >
        <Slot />
      </div>
    </div>
  );
});
