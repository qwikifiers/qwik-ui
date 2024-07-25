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

export const CarouselAutoplay = component$((props: PropsOf<'button'>) => {
  const context = useContext(carouselContextId);
  const intervalIdSig = useSignal<NodeJS.Timeout>();

  const handleClick$ = $(() => {
    context.isAutoPlaySig.value = !context.isAutoPlaySig.value;
  });

  useTask$(function handleAutoplayProgress({ track }) {
    track(() => context.isAutoPlaySig.value);

    if (!context.isAutoPlaySig.value) {
      clearInterval(intervalIdSig.value);
      return;
    }

    const advanceSlideIndex$ = $(() => {
      (context.currentIndexSig.value++ % context.numSlidesSig.value) - 1;
    });

    intervalIdSig.value = setInterval(
      advanceSlideIndex$,
      context.autoPlayIntervalMsSig.value,
    );
  });

  return (
    <button onClick$={[handleClick$, props.onClick$]} {...props}>
      <Slot />
    </button>
  );
});
