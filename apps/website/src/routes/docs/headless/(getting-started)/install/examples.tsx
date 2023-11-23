import { JSXNode, component$ } from '@builder.io/qwik';
import { CodeExampleContainer } from '../../../_components/code-example/code-example-container';

import QwikCityComponent from './examples/qwik-city';
import qwikCityCode from './examples/qwik-city?raw';

import buildingBlocksCode from './examples/building-blocks?raw';
import { PreviewCodeExampleTabs } from '../../../_components/preview-code-example/preview-code-example-tabs';
import { Highlight } from '../../../_components/highlight/highlight';

export type Example = {
  component: JSXNode;
  code: string;
  cssClasses?: string;
};

export const installExamples: Record<string, Example> = {
  qwikCity: {
    component: <QwikCityComponent />,
    code: qwikCityCode,
  },
};

export type ShowExampleProps = {
  example: string;
};

export const ShowExample = component$(({ example }: ShowExampleProps) => {
  const { component, code, cssClasses = '' } = installExamples[example];
  return (
    <PreviewCodeExampleTabs code={code}>
      <div class={['h-10', 'w-20', 'text-white', cssClasses]} q:slot="actualComponent">
        {component}
      </div>

      <Highlight q:slot="codeExample" code={code} />
    </PreviewCodeExampleTabs>
  );
});

export const BuildingBlocksSnip = component$(() => (
  <CodeExampleContainer code={buildingBlocksCode} />
));
