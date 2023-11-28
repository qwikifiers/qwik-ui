import { QwikIntrinsicElements, component$, useSignal, useTask$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { isDev } from '@builder.io/qwik/build';
import { Highlight } from '../highlight/highlight';

// The below `/src/routes/docs/**/**/snippets/*.tsx` pattern is here so that import.meta.glob works both for fluffy and headless routes.
// For example:
// /src/routes/docs/components/fluffy/modal/snippets/building-blocks.tsx
// /src/routes/docs/components/headless/modal/snippets/building-blocks.tsx

const rawCodeSnippets: any = import.meta.glob('/src/routes/docs/**/**/snippets/*', {
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

  const snippetPath = `/src/routes${location.url.pathname}snippets/${name}${lang}`;

  const CodeSnippetSig = useSignal<string>();

  useTask$(async () => {
    // We need to call `await rawCodeSnippets[snippetPath]()` in development as it is `eager:false`
    if (isDev) {
      CodeSnippetSig.value = await rawCodeSnippets[snippetPath]();
      // We need to directly access the `components[componentPath]` expression in preview/production as it is `eager:true`
    } else {
      CodeSnippetSig.value = rawCodeSnippets[snippetPath];
    }
  });
  return (
    <div
      class={`shadow-3xl shadow-light-medium dark:shadow-dark-medium mb-6 rounded-xl border-2 border-slate-200 dark:border-slate-400`}
    >
      <Highlight code={CodeSnippetSig.value || ''} />
    </div>
  );
});
