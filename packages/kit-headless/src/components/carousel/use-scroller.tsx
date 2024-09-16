import { CarouselContext } from './context';
import { $, useSignal, useTask$ } from '@builder.io/qwik';

type OrientationProps = {
  size: 'width' | 'height';
  scroll: 'scrollWidth' | 'scrollHeight';
  client: 'clientWidth' | 'clientHeight';
  direction: 'x' | 'y';
  pagePosition: 'pageX' | 'pageY';
  clientPosition: 'clientX' | 'clientY';
};

export function useScroller(context: CarouselContext) {
  const startPosSig = useSignal<number>();
  const transformSig = useSignal({ x: 0, y: 0, z: 0 });
  const boundariesSig = useSignal<{ min: number; max: number } | null>(null);
  const isMouseDownSig = useSignal(false);
  const isTouchDeviceSig = useSignal(false);
  const isInitialTransitionSig = useSignal(true);
  const userDefinedTransitionSig = useSignal<string>();

  useTask$(() => {
    context.isScrollerSig.value = true;
  });

  const getOrientationProps = $((isVertical: boolean): OrientationProps => {
    if (isVertical) {
      return {
        size: 'height',
        scroll: 'scrollHeight',
        client: 'clientHeight',
        direction: 'y',
        pagePosition: 'pageY',
        clientPosition: 'clientY',
      };
    }

    return {
      size: 'width',
      scroll: 'scrollWidth',
      client: 'clientWidth',
      direction: 'x',
      pagePosition: 'pageX',
      clientPosition: 'clientX',
    };
  });

  const setTransform = $(async () => {
    if (!context.scrollerRef.value) return;
    const isVertical = context.orientationSig.value === 'vertical';
    const { direction: transform } = await getOrientationProps(isVertical);
    const translateValue = transformSig.value[transform];
    const translateString = isVertical
      ? `0, ${translateValue}px, 0`
      : `${translateValue}px, 0, 0`;
    context.scrollerRef.value.style.transform = `translate3d(${translateString})`;
  });

  const setBoundaries = $(async (scrollerRef: HTMLDivElement | undefined) => {
    if (!scrollerRef) return;
    const isVertical = context.orientationSig.value === 'vertical';
    const { scroll, client } = await getOrientationProps(isVertical);
    const maxTransform = 0;
    const minTransform = -(scrollerRef[scroll] - scrollerRef[client]);
    boundariesSig.value = { min: minTransform, max: maxTransform };
  });

  const setTransition = $(async (useTransition: boolean) => {
    if (!context.scrollerRef.value) return;

    if (isInitialTransitionSig.value) {
      userDefinedTransitionSig.value = getComputedStyle(
        context.scrollerRef.value,
      ).transition;

      isInitialTransitionSig.value = false;
    }

    if (useTransition === false) {
      context.scrollerRef.value.style.transition = 'none';
      return;
    }

    context.scrollerRef.value.style.transition =
      userDefinedTransitionSig.value ?? 'revert';
  });

  const getSlidePosition = $(async (index: number) => {
    if (!context.scrollerRef.value) return 0;
    const container = context.scrollerRef.value;
    const slides = context.slideRefsArray.value;
    const isVertical = context.orientationSig.value === 'vertical';
    const { size, client, scroll } = await getOrientationProps(isVertical);
    let position = 0;

    for (let i = 0; i < index; i++) {
      if (slides[i].value) {
        const rect = slides[i].value.getBoundingClientRect();
        position += rect[size];
        position += context.gapSig.value;
      }
    }

    const alignment = context.alignSig.value;
    const currentSlide = slides[index].value;
    const currentRect = currentSlide.getBoundingClientRect();
    const containerSize = container[client];
    const slideSize = currentRect[size];

    if (alignment === 'center') {
      position -= (containerSize - slideSize) / 2;
    } else if (alignment === 'end') {
      position -= containerSize - slideSize;
    }

    const maxPosition = 0;
    const minPosition = -(container[scroll] - containerSize);
    position = Math.max(minPosition, Math.min(maxPosition, -position));

    return Math.abs(position);
  });

  const setInitialSlidePos = $(async () => {
    if (context.startIndexSig.value === undefined) {
      throw new Error('Qwik UI: Q Visible executed when startIndexSig is not set');
    }

    if (!context.scrollerRef.value) {
      return;
    }

    context.scrollerRef.value.style.transform = 'none';

    const scrollLeft = context.scrollerRef.value.scrollLeft;
    const scrollTop = context.scrollerRef.value.scrollTop;

    transformSig.value = {
      x: -scrollLeft,
      y: -scrollTop,
      z: transformSig.value.z,
    };

    await setTransition(false);
    await setTransform();
    context.scrollerRef.value.style.overflow = 'visible';
  });

  return {
    startPosSig,
    transformSig,
    boundariesSig,
    isMouseDownSig,
    isTouchDeviceSig,
    isInitialTransitionSig,
    userDefinedTransitionSig,
    setTransform,
    setBoundaries,
    setTransition,
    setInitialSlidePos,
    getOrientationProps,
    getSlidePosition,
  };
}
