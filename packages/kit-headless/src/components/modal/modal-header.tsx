import { PropsOf, Slot, component$ } from '@builder.io/qwik';

/**
 * @deprecated This component is deprecated and will be removed in future releases.
 */
export const ModalHeader = component$((props: PropsOf<'header'>) => {
  return (
    <header {...props}>
      <Slot />
    </header>
  );
});
