import { JSXNode, component$ } from '@builder.io/qwik';
import { CodeExampleContainer } from '../../../_components/code-example/code-example-container';

import AccordionComponent from './examples/accordion';
import accordionCode from './examples/accordion?raw';

import QwikCityAccordionComponent from './examples/qwik-city-accordion';
import qwikCityAccordionCode from './examples/qwik-city-accordion?raw';

import AstroAccordionComponent from './examples/astro-accordion';
import astroAccordionCode from './examples/astro-accordion?raw';

import buildingBlocksCode from './examples/building-blocks?raw';
import tsConfigCode from './examples/astro-tsconfig.json?raw';
import { PreviewCodeExampleTabs } from '../../../_components/preview-code-example/preview-code-example-tabs';
import { Highlight } from '../../../_components/highlight/highlight';

export type Example = {
  component: JSXNode;
  code: string;
  cssClasses?: string;
};

export const installExamples: Record<string, Example> = {
  accordion: {
    component: <AccordionComponent />,
    code: accordionCode,
  },
  qwikCityAccordion: {
    component: <QwikCityAccordionComponent />,
    code: qwikCityAccordionCode,
  },
  astroAccordion: {
    component: <AstroAccordionComponent />,
    code: astroAccordionCode,
  },
};

export type ShowExampleProps = {
  example: string;
};

export const ShowExample = component$(({ example }: ShowExampleProps) => {
  const { component, code, cssClasses = '' } = installExamples[example];
  return (
    <PreviewCodeExampleTabs code={code}>
      <div class={['text-white', 'min-h-[2.75rem]', cssClasses]} q:slot="actualComponent">
        {component}
      </div>

      <Highlight q:slot="codeExample" code={code} />
    </PreviewCodeExampleTabs>
  );
});

export const BuildingBlocksSnip = component$(() => (
  <CodeExampleContainer code={buildingBlocksCode} />
));

export const TsConfigSnip = component$(() => (
  <CodeExampleContainer code={tsConfigCode} />
));
