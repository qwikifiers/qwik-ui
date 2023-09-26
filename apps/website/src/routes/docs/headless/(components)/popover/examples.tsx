import { component$, type JSXNode } from '@builder.io/qwik';
import { Highlight } from '../../../_components/highlight/highlight';
import { PreviewCodeExample } from '../../../_components/preview-code-example/preview-code-example';
import { CodeExample } from './exports';

import HeroComponent from './examples/hero';
import heroCode from './examples/hero?raw';

import InspectComponent from './examples/inspect';
import inspectCode from './examples/inspect?raw';

import AutoComponent from './examples/auto';
import autoCode from './examples/auto?raw';

import ManualComponent from './examples/manual';
import manualCode from './examples/manual?raw';

import buildingBlocksCode from './examples/buildingBlocks?raw';

export type Example = {
  component: JSXNode;
  code: string;
  cssClasses?: string;
};

export const comboboxExamples: Record<string, Example> = {
  hero: {
    component: <HeroComponent />,
    code: heroCode,
  },
  inspect: {
    component: <InspectComponent />,
    code: inspectCode,
  },
  auto: {
    component: <AutoComponent />,
    code: autoCode,
  },
  manual: {
    component: <ManualComponent />,
    code: manualCode,
  },
};

export type ShowExampleProps = {
  example: string;
};

export const ShowExample = component$(({ example }: ShowExampleProps) => {
  const { component, code, cssClasses = '' } = comboboxExamples[example];
  return (
    <PreviewCodeExample>
      <div class={['flex flex-col gap-4', cssClasses]} q:slot="actualComponent">
        {component}
      </div>

      <Highlight q:slot="codeExample" code={code} />
    </PreviewCodeExample>
  );
});

export const BuildingBlocks = component$(() => (
  <CodeExample>
    <Highlight code={buildingBlocksCode} />
  </CodeExample>
));
