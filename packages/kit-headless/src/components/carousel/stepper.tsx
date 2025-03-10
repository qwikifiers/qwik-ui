import { component$, PropsOf, Slot } from '@qwik.dev/core';

export const CarouselStepper = component$((props: PropsOf<'div'>) => {
  return (
    <div role="navigation" {...props}>
      <Slot />
    </div>
  );
});
