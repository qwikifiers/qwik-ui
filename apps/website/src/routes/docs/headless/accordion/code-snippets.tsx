import { component$ } from '@builder.io/qwik';
import { CodeSnippet } from '~/components/code-snippet/code-snippet';

import BuildingBlocksSnippet from './snippets/building-blocks.tsx?raw';
export const CodeSnippetBuildingBlocks = component$(() => {
  return <CodeSnippet code={BuildingBlocksSnippet} />;
});

import AnimationsCssSnippet from './snippets/animations.css?raw';
export const CodeSnippetAnimationsCss = component$(() => {
  return <CodeSnippet code={AnimationsCssSnippet} />;
});

import AccordionCssSnippet from './snippets/accordion.css?raw';
export const CodeSnippetAccordionCss = component$(() => {
  return <CodeSnippet code={AccordionCssSnippet} />;
});
