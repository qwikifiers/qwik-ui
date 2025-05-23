import { component$ } from '@builder.io/qwik';
import { CodeSnippet } from '~/components/code-snippet/code-snippet';

import BuildingBlocksSnippet from './snippets/building-blocks.tsx?raw';
export const CodeSnippetBuildingBlocks = component$(() => {
  return <CodeSnippet code={BuildingBlocksSnippet} />;
});

import BackdropCssSnippet from './snippets/backdrop.css?raw';
export const CodeSnippetBackdropCss = component$(() => {
  return <CodeSnippet code={BackdropCssSnippet} />;
});

import StrippedStylesCssSnippet from './snippets/stripped-styles.css?raw';
export const CodeSnippetStrippedStylesCss = component$(() => {
  return <CodeSnippet code={StrippedStylesCssSnippet} />;
});

import AnimationsCssSnippet from './snippets/animations.css?raw';
export const CodeSnippetAnimationsCss = component$(() => {
  return <CodeSnippet code={AnimationsCssSnippet} />;
});

import ModalCssSnippet from './snippets/modal.css?raw';
export const CodeSnippetModalCss = component$(() => {
  return <CodeSnippet code={ModalCssSnippet} />;
});

import PageLoadSnippet from './snippets/page-load.tsx?raw';
export const CodeSnippetPageLoad = component$(() => {
  return <CodeSnippet code={PageLoadSnippet} />;
});
