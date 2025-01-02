import {
  type PropsOf,
  Slot,
  component$,
  useContext,
  useTask$,
  useSignal,
  useComputed$,
  $,
} from '@builder.io/qwik';
import { carouselContextId } from './context';

export type CarouselSlideProps = PropsOf<'div'> & {
  _index?: number;
};

export const CarouselSlide = component$(({ _index, ...props }: CarouselSlideProps) => {
  const context = useContext(carouselContextId);
  const slideRef = useSignal<HTMLDivElement | undefined>();
  const slideId = `${context.localId}-${_index ?? -1}`;
  const isVisibleSig = useComputed$(() => {
    const start = context.currentIndexSig.value;
    const end = start + context.slidesPerViewSig.value;
    return _index !== undefined && _index >= start && _index < end;
  });
  const isActiveSig = useComputed$(() => {
    return context.currentIndexSig.value === _index;
  });
  /** Used to hide the actual slide when it's inactive */
  const isInactiveSig = useComputed$(() => {
    return !context.isScrollerSig.value && !isActiveSig.value;
  });

  useTask$(function getIndexOrder() {
    if (_index !== undefined) {
      context.slideRefsArray.value[_index] = slideRef;
    } else {
      throw new Error('Qwik UI: Carousel Slide cannot find its proper index.');
    }
  });

  const handleFocusIn$ = $(() => {
    context.isAutoplaySig.value = false;
  });

  return (
    <>
      <ScrollMarker align="start" _index={_index} />
      <div
        ref={slideRef}
        id={slideId}
        inert={!isVisibleSig.value}
        hidden={isInactiveSig.value}
        aria-roledescription="slide"
        data-orientation={context.orientationSig.value}
        role={context.bulletRefsArray.value.length > 0 ? 'tabpanel' : undefined}
        data-qui-carousel-slide
        data-active={isVisibleSig.value ? '' : undefined}
        aria-label={`${_index !== undefined && _index + 1} of ${context.numSlidesSig.value}`}
        onFocusIn$={[handleFocusIn$, props.onFocusIn$]}
        {...props}
      >
        <Slot />
        <ScrollMarker align="center" _index={_index} />
      </div>
      <ScrollMarker align="end" _index={_index} />
    </>
  );
});

type ScrollMarkerProps = PropsOf<'div'> & {
  align: 'start' | 'center' | 'end';
  _index: number | undefined;
};

const ScrollMarker = component$((props: ScrollMarkerProps) => {
  const context = useContext(carouselContextId);

  const { align, _index, ...rest } = props;

  if (_index === undefined) return;

  const isVisible =
    context.startIndexSig.value === _index && context.alignSig.value === align;

  return (
    <div
      ref={context.scrollStartRef}
      data-qui-scroll-start
      data-orientation={context.orientationSig.value}
      hidden={!isVisible}
      {...{ [`data-${align}`]: '' }}
      {...rest}
    ></div>
  );
});
