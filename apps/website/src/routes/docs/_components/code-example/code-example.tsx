import { component$, Slot } from '@builder.io/qwik';

export const CodeExample = component$((props: { classes?: string }) => {
  return (
    <div class={`p-12 mb-6 rounded-xl bg-slate-900 ${props.classes}`}>
      <section class="overflow-x-auto">
        <Slot />
      </section>
    </div>
  );
});
