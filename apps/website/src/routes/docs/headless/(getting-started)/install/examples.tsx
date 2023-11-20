import { JSXNode, component$ } from '@builder.io/qwik';
import { CodeExampleContainer } from '../../../_components/code-example/code-example-container';

import buildingBlocksCode from './examples/building-blocks?raw';

export type Example = {
  component: JSXNode;
  code: string;
  cssClasses?: string;
};

export const BuildingBlocksSnip = component$(() => (
  <CodeExampleContainer code={buildingBlocksCode} />
));
