import CustomArrows from './examples/custom-arrows';
import CustomButtonLabels from './examples/custom-button-labels';
import Disabled from './examples/disabled';
import HidePrevNextButtons from './examples/hide-prev-next-buttons';
import Styling from './examples/styling';
import { JSXNode, component$ } from '@builder.io/qwik';

import Basic from './examples/basic';
import Interactive from './examples/interactive';
import basicCode from './examples/basic?raw';
import interactiveCode from './examples/interactive?raw';
import hidePrevNextButtonsCode from './examples/hide-prev-next-buttons?raw';
import customButtonLabelsCode from './examples/custom-button-labels?raw';
import stylingCode from './examples/styling?raw';
import customArrowsCode from './examples/custom-arrows?raw';
import disabledCode from './examples/disabled?raw';
import { PreviewCodeExampleTabs } from '~/components/preview-code-example/preview-code-example-tabs';

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
  hidePrevNextButtons: {
    component: <HidePrevNextButtons />,
    code: hidePrevNextButtonsCode,
  },
  customButtonLabels: {
    component: <CustomButtonLabels />,
    code: customButtonLabelsCode,
  },
  styling: {
    component: <Styling />,
    code: stylingCode,
  },
  customArrows: {
    component: <CustomArrows />,
    code: customArrowsCode,
  },
  disabled: {
    component: <Disabled />,
    code: disabledCode,
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
