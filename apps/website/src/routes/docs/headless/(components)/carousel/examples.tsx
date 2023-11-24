import { component$, type JSXNode } from '@builder.io/qwik';

import { Highlight } from '../../../_components/highlight/highlight';
import { PreviewCodeExampleTabs } from '../../../_components/preview-code-example/preview-code-example-tabs';

import HeroComponent from './examples/hero';
import heroCode from './examples/hero?raw';

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
};

export type ShowExampleProps = {
  example: string;
};

export const ShowExample = component$(({ example }: ShowExampleProps) => {
  const { component, code, cssClasses = '' } = comboboxExamples[example];
  return (
    <PreviewCodeExampleTabs code={code}>
      <div class={['flex w-full flex-col gap-4', cssClasses]} q:slot="actualComponent">
        {component}
      </div>

      <Highlight q:slot="codeExample" code={code} />
    </PreviewCodeExampleTabs>
  );
});
