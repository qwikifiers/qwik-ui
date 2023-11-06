import { QwikIntrinsicElements, component$, useSignal, useTask$ } from '@builder.io/qwik';
import { Highlight } from '../highlight';
import { useLocation } from '@builder.io/qwik-city';
import { removeDocsFromPath } from '~/lib/utils';

const componentsRaw = import.meta.glob('/src/examples/**/**/snippets/*', {
  as: 'raw',
});

type CodeSnippetProps = QwikIntrinsicElements['div'] & {
  name?: string;
};

export const CodeSnippet = component$<CodeSnippetProps>(({ name }) => {
  const location = useLocation();

  const dynamicPath = removeDocsFromPath(location.url.pathname);
  const componentPath = `/src/examples/${dynamicPath}snippets/${name}.tsx`;

  const ComponentRaw = useSignal<string>();

  useTask$(async () => {
    ComponentRaw.value = (await componentsRaw[componentPath]()) as string;
  });
  return (
    <div
      class={`shadow-3xl shadow-light-medium dark:shadow-dark-medium mb-6 rounded-xl border-2 border-slate-200 dark:border-slate-400`}
    >
      <Highlight code={ComponentRaw.value || ''} />
    </div>
  );
});
