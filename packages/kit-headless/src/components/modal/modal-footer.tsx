import { PropsOf, Slot, component$ } from '@builder.io/qwik';

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 */
export const ModalFooter = component$((props: PropsOf<'footer'>) => {
  return (
    <footer {...props}>
      <Slot />
    </footer>
  );
});
