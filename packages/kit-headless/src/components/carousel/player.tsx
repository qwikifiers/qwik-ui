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

export const CarouselPlayer = component$((props: PropsOf<'button'>) => {
  const context = useContext(carouselContextId);
  const intervalIdSig = useSignal<NodeJS.Timeout>();

  const handleClick$ = $(() => {
    context.isAutoplaySig.value = !context.isAutoplaySig.value;
  });

  useTask$(function handleAutoplayProgress({ track }) {
    track(() => context.isAutoplaySig.value);

    if (!context.isAutoplaySig.value) {
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
    <button
      aria-label={
        context.isAutoplaySig.value
          ? 'stop automatic slide show'
          : 'start automatic slide show'
      }
      onClick$={[handleClick$, props.onClick$]}
      {...props}
    >
      <Slot />
    </button>
  );
});
