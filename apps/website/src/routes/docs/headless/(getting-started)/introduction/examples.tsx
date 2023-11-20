import { JSXNode, component$ } from '@builder.io/qwik';
import { CodeExampleContainer } from '../../../_components/code-example/code-example-container';
import headlessJsxCode from './examples/headless-jsx?raw';
import headlessCssCode from './examples/headless-css.css?raw';

export type Example = {
  component: JSXNode;
  code: string;
  cssClasses?: string;
};

export const HeadlessJsxSnip = component$(() => (
  <CodeExampleContainer code={headlessJsxCode} />
));

export const HeadlessCssSnip = component$(() => (
  <CodeExampleContainer code={headlessCssCode} />
));
