import { component$ } from '@builder.io/qwik';
import { CodeSnippet } from '~/components/code-snippet/code-snippet';

import BuildingBlocksSnippet from './snippets/building-blocks.tsx?raw';
export const CodeSnippetBuildingBlocks = component$(() => {
  return <CodeSnippet code={BuildingBlocksSnippet} />;
});

import FloatingCssSnippet from './snippets/floating.css?raw';
export const CodeSnippetFloatingCss = component$(() => {
  return <CodeSnippet code={FloatingCssSnippet} />;
});

import PopoverCssSnippet from './snippets/popover.css?raw';
export const CodeSnippetPopoverCss = component$(() => {
  return <CodeSnippet code={PopoverCssSnippet} />;
});
