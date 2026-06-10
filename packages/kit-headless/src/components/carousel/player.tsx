import { component$, PropsOf, Slot, useContext, $ } from '@qwik.dev/core';
import { carouselContextId } from './context';

export const CarouselPlayer = component$((props: PropsOf<'button'>) => {
  const context = useContext(carouselContextId);

  const handleClick$ = $(() => {
    context.isAutoplaySig.value = !context.isAutoplaySig.value;
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
