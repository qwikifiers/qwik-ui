import { PropsOf, Slot, component$ } from '@builder.io/qwik';

export const ModalContent = component$((props: PropsOf<'div'>) => {
  return (
    <div {...props}>
      <Slot />
    </div>
  );
});
