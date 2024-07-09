import { PropsOf, component$, useSignal, useTask$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { isDev } from '@builder.io/qwik/build';
import { Highlight } from '../highlight/highlight';

// The below `/src/routes/docs/**/**/snippets/*.tsx` pattern is here so that import.meta.glob works both for styled and headless routes.
// For example:
// /src/routes/docs/components/styled/modal/snippets/building-blocks.tsx
// /src/routes/docs/components/headless/modal/snippets/building-blocks.tsx

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const codeSnippets: any = import.meta.glob('/src/routes/docs/**/**/snippets/*', {
  query: '?raw',
  import: 'default',
  eager: isDev ? false : true,
});

type CodeSnippetProps = PropsOf<'div'> & {
  name: string;
};

export const CodeSnippet = component$<CodeSnippetProps>(({ name }) => {
  const location = useLocation();

  // Determine the file extension if not specified
  const fileExtension =
    name.endsWith('.tsx') || name.endsWith('.ts') || name.endsWith('.css') ? '' : '.tsx';
  const snippetPath = `/src/routes${location.url.pathname}snippets/${name}${fileExtension}`;

  const codeSnippetSig = useSignal<string>();

  useTask$(async () => {
    codeSnippetSig.value = isDev
      ? await codeSnippets[snippetPath]() // We need to call `await codeSnippets[snippetPath]()` in development as it is `eager:false`
      : codeSnippets[snippetPath]; // We need to directly access the `codeSnippets[snippetPath]` expression in preview/production as it is `eager:true`
  });

  return (
    <div class="shadow-3xl mb-6 rounded-md border shadow-lg">
      <Highlight code={codeSnippetSig.value || ''} />
    </div>
  );
});
