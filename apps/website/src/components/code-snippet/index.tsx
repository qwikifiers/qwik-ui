import { QwikIntrinsicElements, component$, useSignal, useTask$ } from '@builder.io/qwik';
import { Highlight } from '../highlight';
import { useLocation } from '@builder.io/qwik-city';
import { removeDocsFromPath } from '~/lib/utils';

const snippetRaw = import.meta.glob('/src/examples/**/**/*', {
  as: 'raw',
});

type CodeSnippetProps = QwikIntrinsicElements['div'] & {
  name: string;
};

export const CodeSnippet = component$<CodeSnippetProps>(({ name }) => {
  const location = useLocation();

  let lang = '.tsx';

  if (name.endsWith('.tsx')) lang = '';
  if (name.endsWith('.ts')) lang = '';
  if (name.endsWith('.css')) lang = '';

  const dynamicPath = removeDocsFromPath(location.url.pathname);
  const snippetPath = `/src/examples/${dynamicPath}${name}${lang}`;

  const ComponentRaw = useSignal<string>();

  useTask$(async () => {
    ComponentRaw.value = (await snippetRaw[snippetPath]()) as string;
  });
  return (
    <div
      class={`shadow-3xl shadow-light-medium dark:shadow-dark-medium mb-6 rounded-xl border-2 border-slate-200 dark:border-slate-400`}
    >
      <Highlight code={ComponentRaw.value || ''} />
    </div>
  );
});
