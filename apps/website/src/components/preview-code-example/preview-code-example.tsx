import { component$, Slot } from '@builder.io/qwik';

export const PreviewCodeExample = component$(() => {
  return (
    <div class="rounded-xl">
      <section class="sm:-mx-12 mt-6 p-12 rounded-t-xl bg-slate-700 flex flex-col items-center">
        <Slot name="actualComponent" />
      </section>

      <section class="sm:-mx-12 p-12 rounded-b-xl bg-slate-900">
        <Slot name="codeExample" />
      </section>
    </div>
  );
});
