import { component$, PropsOf, Slot } from '@builder.io/qwik';

export const CarouselStepper = component$((props: PropsOf<'div'>) => {
  return (
    <div role="navigation" {...props}>
      <Slot />
    </div>
  );
});
