import {
  component$,
  PropsOf,
  Slot,
  useContext,
  $,
  useTask$,
  useSignal,
} from '@builder.io/qwik';
import { carouselContextId } from './context';
import { isServer } from '@builder.io/qwik/build';

export const CarouselPlayer = component$((props: PropsOf<'button'>) => {
  const context = useContext(carouselContextId);
  const intervalIdSig = useSignal<NodeJS.Timeout>();
  const isReducedMotionSig = useSignal(false);
  const hasChangeListenerSig = useSignal(false);

  const handleClick$ = $(() => {
    context.isAutoplaySig.value = !context.isAutoplaySig.value;
  });

  const checkReducedMotion$ = $(async (e: MediaQueryListEvent) => {
    isReducedMotionSig.value = e.matches;
    if (e.matches) {
      context.isAutoplaySig.value = false;
      clearInterval(intervalIdSig.value);
    }
  });

  useTask$(function handleReducedMotion({ track }) {
    track(() => context.currentIndexSig.value);

    if (isServer) return;

    const mediaQueryList = window.matchMedia('(prefers-reduced-motion: reduce)');
    isReducedMotionSig.value = mediaQueryList.matches;

    if (!hasChangeListenerSig.value) {
      mediaQueryList.addEventListener('change', checkReducedMotion$);
      hasChangeListenerSig.value = true;
    }
  });

  useTask$(function handleAutoplayProgress({ track }) {
    track(() => context.isAutoplaySig.value);

    if (isReducedMotionSig.value) return;

    if (!context.isAutoplaySig.value) {
      clearInterval(intervalIdSig.value);
      return;
    }

    const advanceSlideIndex$ = $(() => {
      context.currentIndexSig.value =
        (context.currentIndexSig.value + 1) % context.numSlidesSig.value;
    });

    intervalIdSig.value = setInterval(
      advanceSlideIndex$,
      context.autoPlayIntervalMsSig.value,
    );
  });

  return (
    <button
      aria-label={
        context.isAutoplaySig.value
          ? 'stop automatic slide show'
          : 'start automatic slide show'
      }
      onClick$={[handleClick$, props.onClick$]}
      data-qui-carousel-player
      {...props}
    >
      <Slot />
    </button>
  );
});
