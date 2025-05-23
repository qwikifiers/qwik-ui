import { component$ } from '@builder.io/qwik';
import { CodeSnippet } from '~/components/code-snippet/code-snippet';

import BuildingBlocksSnippet from './snippets/building-blocks.tsx?raw';
export const CodeSnippetBuildingBlocks = component$(() => {
  return <CodeSnippet code={BuildingBlocksSnippet} />;
});

import AstroTsConfigSnippet from './snippets/astro-tsconfig.json?raw';
export const CodeSnippetAstroTsConfig = component$(() => {
  return <CodeSnippet code={AstroTsConfigSnippet} />;
});
