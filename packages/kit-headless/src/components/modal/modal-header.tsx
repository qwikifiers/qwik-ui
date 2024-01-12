import { PropsOf, Slot, component$ } from '@builder.io/qwik';

export const ModalHeader = component$((props: PropsOf<'header'>) => {
  return (
    <header {...props}>
      <Slot />
    </header>
  );
});
