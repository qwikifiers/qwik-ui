import { component$, Slot } from '@builder.io/qwik';

export const CodeExample = component$(() => {
  return (
    <section class="p-12 mt-6 rounded-xl bg-slate-900 overflow-x-auto">
      <Slot />
    </section>
  );
});
