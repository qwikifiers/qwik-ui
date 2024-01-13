import { PropsOf, Slot, component$ } from '@builder.io/qwik';

export const ModalFooter = component$((props: PropsOf<'footer'>) => {
  return (
    <footer {...props}>
      <Slot />
    </footer>
  );
});
