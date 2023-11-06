import { JSXNode, component$ } from '@builder.io/qwik';
import { PreviewCodeExampleTabs } from '../../../_components/preview-code-example/preview-code-example-tabs';

import Basic from './examples/basic';
import Interactive from './examples/interactive';
import basicCode from './examples/basic?raw';
import interactiveCode from './examples/interactive?raw';

export type Example = {
  component: JSXNode;
  code: string;
  cssClasses?: string;
};

export const examples: Record<string, Example> = {
  basic: {
    component: <Basic />,
    code: basicCode,
  },
  interactive: {
    component: <Interactive />,
    code: interactiveCode,
  },
};

export type ShowExampleProps = {
  example: string;
};

export const ShowExample = component$(({ example }: ShowExampleProps) => {
  const { component, code } = examples[example];
  return (
    <PreviewCodeExampleTabs code={code}>
      <div q:slot="actualComponent">{component}</div>
    </PreviewCodeExampleTabs>
  );
});
