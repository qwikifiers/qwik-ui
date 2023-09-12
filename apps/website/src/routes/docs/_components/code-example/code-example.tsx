import { component$, Slot } from '@builder.io/qwik';

export const CodeExample = component$((props: { classes?: string }) => {
  return (
    <div
      class={`shadow-light-low dark:shadow-dark-low mb-6 rounded-xl border-2 border-slate-500 bg-slate-800 p-12 dark:border-slate-400 dark:bg-slate-900 ${props.classes}`}
    >
      <section class="overflow-x-auto">
        <Slot />
      </section>
    </div>
  );
});
