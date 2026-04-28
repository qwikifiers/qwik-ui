import { component$ } from '@qwik.dev/core';
import { CodeSnippet } from '~/components/code-snippet/code-snippet';

import BuildingBlocksSnippet from './snippets/building-blocks.tsx?raw';
export const CodeSnippetBuildingBlocks = component$(() => {
  return <CodeSnippet code={BuildingBlocksSnippet} />;
});

import LabelCssSnippet from './snippets/label.css?raw';
export const CodeSnippetLabelCss = component$(() => {
  return <CodeSnippet code={LabelCssSnippet} />;
});
