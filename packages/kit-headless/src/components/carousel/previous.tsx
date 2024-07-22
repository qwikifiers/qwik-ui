import { PropsOf, Slot, component$, useContext, useSignal, $ } from '@builder.io/qwik';
import { carouselContextId } from './context';
import { VisuallyHidden } from '../../utils/visually-hidden';

export const CarouselPrevious = component$((props: PropsOf<'button'>) => {
  const context = useContext(carouselContextId);
  const isKeyboardFocusSig = useSignal(false);

  const handleFocus$ = $((e: FocusEvent) => {
    isKeyboardFocusSig.value = e.detail === 0;
  });

  const handleBlur$ = $(() => {
    if (isKeyboardFocusSig.value && context.currentIndexSig.value === 0) {
      context.nextButtonRef.value?.focus();
    }
    isKeyboardFocusSig.value = false;
  });

  return (
    <button
      {...props}
      ref={context.prevButtonRef}
      aria-disabled={context.currentIndexSig.value === 0}
      disabled={context.currentIndexSig.value === 0}
      onClick$={() => {
        context.currentIndexSig.value--;
      }}
      onFocus$={[handleFocus$, props.onFocus$]}
      onBlur$={[handleBlur$, props.onBlur$]}
      data-qui-carousel-prev
    >
      <VisuallyHidden>previous slide</VisuallyHidden>
      <Slot />
    </button>
  );
});
