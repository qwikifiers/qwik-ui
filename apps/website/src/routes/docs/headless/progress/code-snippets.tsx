import { component$ } from '@builder.io/qwik';
import { CodeSnippet } from '~/components/code-snippet/code-snippet';

import BuildingBlocksSnippet from './snippets/building-blocks.tsx?raw';
export const CodeSnippetBuildingBlocks = component$(() => {
  return <CodeSnippet code={BuildingBlocksSnippet} />;
});

import IndeterminateCssSnippet from './snippets/indeterminate.css?raw';
export const CodeSnippetIndeterminateCss = component$(() => {
  return <CodeSnippet code={IndeterminateCssSnippet} />;
});

import ProgressCssSnippet from './snippets/progress.css?raw';
export const CodeSnippetProgressCss = component$(() => {
  return <CodeSnippet code={ProgressCssSnippet} />;
});
