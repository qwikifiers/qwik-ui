import {
  PropsOf,
  Slot,
  component$,
  useContext,
  useSignal,
  $,
  useId,
} from '@builder.io/qwik';
import { carouselContextId } from './context';
import { VisuallyHidden } from '../../utils/visually-hidden';

export const CarouselPrevious = component$((props: PropsOf<'button'>) => {
  const context = useContext(carouselContextId);
  const isKeyboardFocusSig = useSignal(false);
  const previousId = useId();

  const handleFocusNext$ = $(() => {
    if (context.isLoopSig.value) return;

    if (isKeyboardFocusSig.value && context.currentIndexSig.value === 0) {
      const activeElAtBlur = document.activeElement;
      setTimeout(() => {
        if (document.activeElement !== activeElAtBlur) return;
        if (context.currentIndexSig.value === 0) {
          context.nextButtonRef.value?.focus();
        }
      }, 2000);
    }
    isKeyboardFocusSig.value = false;
  });

  const handleKeyDown$ = $(() => {
    isKeyboardFocusSig.value = true;
  });

  const handleClick$ = $(() => {
    if (context.currentIndexSig.value === 0 && context.isLoopSig.value) {
      context.currentIndexSig.value = context.numSlidesSig.value - 1;
    } else {
      context.currentIndexSig.value--;
    }
  });

  return (
    <button
      {...props}
      ref={context.prevButtonRef}
      aria-disabled={context.currentIndexSig.value === 0}
      disabled={context.currentIndexSig.value === 0 && !context.isLoopSig.value}
      onClick$={[handleClick$, props.onClick$]}
      onBlur$={[handleFocusNext$, props.onBlur$]}
      onKeyDown$={[handleKeyDown$, props.onKeyDown$]}
      data-qui-carousel-prev
      aria-labelledby={previousId}
    >
      <VisuallyHidden id={previousId}>previous slide</VisuallyHidden>
      <Slot />
    </button>
  );
});
