import { QwikIntrinsicElements, component$, useSignal, useTask$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { isDev } from '@builder.io/qwik/build';
import { Highlight } from '../highlight/highlight';

type CodeSnippetProps = QwikIntrinsicElements['div'] & {
  name: string;
};

const rawCodeSnippets: any = import.meta.glob('/src/routes/docs/**/**/snippets/*', {
  as: 'raw',
  eager: isDev ? false : true,
});

export const CodeSnippet = component$<CodeSnippetProps>(({ name }) => {
  const location = useLocation();

  let lang = '.tsx';

  if (name.endsWith('.tsx')) lang = '';
  if (name.endsWith('.ts')) lang = '';
  if (name.endsWith('.css')) lang = '';

  const snippetPath = `/src/routes${location.url.pathname}snippets/${name}${lang}`;

  const CodeSnippet = useSignal<string>();

  useTask$(async () => {
    if (isDev) {
      CodeSnippet.value = await rawCodeSnippets[snippetPath]();
    } else {
      CodeSnippet.value = rawCodeSnippets[snippetPath];
    }
  });
  return (
    <div
      class={`shadow-3xl shadow-light-medium dark:shadow-dark-medium mb-6 rounded-xl border-2 border-slate-200 dark:border-slate-400`}
    >
      <Highlight code={CodeSnippet.value || ''} />
    </div>
  );
});
