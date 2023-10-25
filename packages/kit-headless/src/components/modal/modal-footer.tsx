import { QwikIntrinsicElements, Slot, component$ } from '@builder.io/qwik';

export const ModalFooter = component$((props: QwikIntrinsicElements['footer']) => {
  return (
    <footer {...props}>
      <Slot />
    </footer>
  );
});
