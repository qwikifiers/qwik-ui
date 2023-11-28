import { component$ } from '@builder.io/qwik';
import { Highlight } from '../highlight/highlight';

export const CodeExampleContainer = component$((props: { code: string }) => {
  return (
    <div
      class={`shadow-3xl shadow-light-medium dark:shadow-dark-medium mb-6 rounded-xl border-2 border-slate-200 dark:border-slate-400`}
    >
      <Highlight code={props.code} />
    </div>
  );
});
