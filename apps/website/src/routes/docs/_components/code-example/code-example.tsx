import { component$, Slot } from '@builder.io/qwik';

export const CodeExample = component$((props: { classes?: string }) => {
  return (
    <div
      class={`p-12 mb-6 rounded-xl bg-slate-800 dark:bg-slate-900 shadow-light-low dark:shadow-dark-low border-slate-500 dark:border-slate-400 border-2 ${props.classes}`}
    >
      <section class="overflow-x-auto">
        <Slot />
      </section>
    </div>
  );
});
