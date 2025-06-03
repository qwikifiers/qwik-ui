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

import AccordionCssSnippet from './snippets/accordion.css?raw';
export const CodeSnippetAccordionCss = component$(() => {
  return <CodeSnippet code={AccordionCssSnippet} />;
});
