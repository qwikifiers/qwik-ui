import { QwikIntrinsicElements, component$, useSignal, useTask$ } from '@builder.io/qwik';
import { Highlight } from '../highlight';
import { useLocation } from '@builder.io/qwik-city';
import { removeDocsFromPath } from '~/lib/utils';
import { isDev } from '@builder.io/qwik/build';

const componentsRaw: any = import.meta.glob('/src/examples/**/**/*', {
  as: 'raw',
  eager: isDev ? false : true,
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
    if (isDev) {
      ComponentRaw.value = await componentsRaw[snippetPath]();
    } else {
      ComponentRaw.value = componentsRaw[snippetPath];
    }
  });
  return (
    <div
      class={`shadow-3xl shadow-light-medium dark:shadow-dark-medium mb-6 rounded-xl border-2 border-slate-200 dark:border-slate-400`}
    >
      <Highlight code={ComponentRaw.value || ''} />
    </div>
  );
});
