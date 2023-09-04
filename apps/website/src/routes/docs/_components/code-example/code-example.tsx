import { component$, Slot } from '@builder.io/qwik';

export const CodeExample = component$(() => {
  return (
    <div class="mb-6 rounded-xl p-12 ">
      <section class="overflow-x-auto">
        <Slot />
      </section>
    </div>
  );
});
