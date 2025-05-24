import { component$ } from '@builder.io/qwik';
import { CodeSnippet } from '~/components/code-snippet/code-snippet';

import BuildingBlocksSnippet from './snippets/building-blocks.tsx?raw';
export const CodeSnippetBuildingBlocks = component$(() => {
  return <CodeSnippet code={BuildingBlocksSnippet} />;
});

import AnimationCssSnippet from './snippets/animation.css?raw';
export const CodeSnippetAnimationCss = component$(() => {
  return <CodeSnippet code={AnimationCssSnippet} />;
});

import CollapsibleCssSnippet from './snippets/collapsible.css?raw';
export const CodeSnippetCollapsibleCss = component$(() => {
  return <CodeSnippet code={CollapsibleCssSnippet} />;
});
