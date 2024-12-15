import { component$, Slot } from '@builder.io/qwik';

export const ComboboxInline = component$(() => {
  return (
    <div role="listbox">
      <Slot />
    </div>
  );
});
