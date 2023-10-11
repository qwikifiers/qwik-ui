import { JSXNode, component$, useStyles$ } from '@builder.io/qwik';
import { PreviewCodeExampleTabs } from '../../../_components/preview-code-example/preview-code-example-tabs';

import Hero from './examples/hero';
import heroExampleCode from './examples/hero?raw';

import Inspect from './examples/inspect';
import inspectExampleCode from './examples/inspect?raw';

import styles from './index.css?inline';

export type Example = {
  component: JSXNode;
  code: string;
  cssClasses?: string;
};

export const examples: Record<string, Example> = {
  hero: {
    component: <Hero />,
    code: heroExampleCode,
  },
  inspect: {
    component: <Inspect />,
    code: inspectExampleCode,
  },
};

export type ShowExampleProps = {
  example: string;
};

export const ShowExample = component$(({ example }: ShowExampleProps) => {
  useStyles$(styles);

  const { component, code, cssClasses = '' } = examples[example];
  return (
    <PreviewCodeExampleTabs code={code}>
      <div q:slot="actualComponent" class={['tabs-example mx-auto', cssClasses]}>
        {component}
      </div>
    </PreviewCodeExampleTabs>
  );
});
