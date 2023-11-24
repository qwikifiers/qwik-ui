import { JSXNode, component$ } from '@builder.io/qwik';
// eslint-disable-next-line @nx/enforce-module-boundaries
import AnimationExampleComponent from './examples/animation';
import animationExamplesCode from './examples/animation?raw';
import CombinationExampleComponent from './examples/combination';
import combinationExamplesCode from './examples/combination?raw';
import IconExampleComponent from './examples/icon';
import iconExamplesCode from './examples/icon?raw';
import IntentExampleComponent from './examples/intent';
import intentExamplesCode from './examples/intent?raw';
import LookExampleComponent from './examples/look';
import lookExamplesCode from './examples/look?raw';
import ShapeExampleComponent from './examples/shape';
import shapeExamplesCode from './examples/shape?raw';
import SizeExampleComponent from './examples/size';
import sizeExamplesCode from './examples/size?raw';
import StateExampleComponent from './examples/state';
import stateExamplesCode from './examples/state?raw';
import { CodeExampleContainer } from '~/components/code-example/code-example-container';
import { PreviewCodeExampleVertical } from '~/components/preview-code-example/preview-code-example-vertical';
import { Highlight } from '~/components/highlight/highlight';
import { ShowExampleProps } from '~/routes/docs/headless/(components)/combobox/examples';
// eslint-disable-next-line @nx/enforce-module-boundaries
import ButtonCode from '../../../../../../../../packages/kit-fluffy/src/components/button/button?raw';
export type Example = {
  component: JSXNode;
  code: string;
  cssClasses?: string;
};

export const examples: Record<string, Example> = {
  buttons: {
    component: <IntentExampleComponent />,
    code: intentExamplesCode,
  },
  look: {
    component: <LookExampleComponent />,
    code: lookExamplesCode,
  },
  shape: {
    component: <ShapeExampleComponent />,
    code: shapeExamplesCode,
  },
  size: {
    component: <SizeExampleComponent />,
    code: sizeExamplesCode,
  },
  state: {
    component: <StateExampleComponent />,
    code: stateExamplesCode,
  },
  animation: {
    component: <AnimationExampleComponent />,
    code: animationExamplesCode,
  },
  icon: {
    component: <IconExampleComponent />,
    code: iconExamplesCode,
  },
  combination: {
    component: <CombinationExampleComponent />,
    code: combinationExamplesCode,
  },
};

export const InstallExample = component$(() => (
  <CodeExampleContainer code={ButtonCode} />
));

export const ShowExample = component$(({ example }: ShowExampleProps) => {
  const { component, code, cssClasses = '' } = examples[example];
  return (
    <PreviewCodeExampleVertical code={code}>
      <div q:slot="actualComponent" class={['tabs-example mr-auto', cssClasses]}>
        {component}
      </div>

      <Highlight q:slot="codeExample" code={code} />
    </PreviewCodeExampleVertical>
  );
});
