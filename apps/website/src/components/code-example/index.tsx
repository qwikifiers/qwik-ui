import { component$, Slot } from '@builder.io/qwik';
import { CodeCopy } from '../code-copy';

// TODO: Remove this component once all the docs are migrated to CodeExampleContainer

export const CodeExample = component$((props: { classes?: string; code?: string }) => {
  return (
    <div
      class={`shadow-light-low dark:shadow-dark-low relative mb-6 rounded-xl border-2 border-slate-500 bg-slate-800 p-12 dark:border-slate-400 dark:bg-slate-900 ${props.classes}`}
    >
      <CodeCopy class="absolute right-0 top-0" code={props.code} />
      <section class="overflow-x-auto">
        <Slot />
      </section>
    </div>
  );
});
