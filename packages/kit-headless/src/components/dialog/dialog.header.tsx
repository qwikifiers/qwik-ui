import { Slot, component$ } from '@builder.io/qwik';

export const Header = component$(() => {
  return (
    <header>
      <Slot />
    </header>
  );
});
