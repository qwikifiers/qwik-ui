import { component$ } from '@builder.io/qwik';
import { CodeSnippet } from '~/components/code-snippet/code-snippet';

import LongSnippet from './snippets/long.tsx?raw';
export const CodeSnippetLong = component$(() => {
  return <CodeSnippet code={LongSnippet} />;
});

import ShortSnippet from './snippets/short.tsx?raw';
export const CodeSnippetShort = component$(() => {
  return <CodeSnippet code={ShortSnippet} />;
});
