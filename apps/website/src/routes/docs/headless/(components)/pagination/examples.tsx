import CustomButtonLabels from '@/apps/website/src/routes/docs/headless/(components)/pagination/examples/customButtonLabels';
import HidePrevNextButtons from '@/apps/website/src/routes/docs/headless/(components)/pagination/examples/hidePrevNextButtons';
import Styling from '@/apps/website/src/routes/docs/headless/(components)/pagination/examples/styling';
import { JSXNode, component$ } from '@builder.io/qwik';
import { PreviewCodeExampleTabs } from '../../../_components/preview-code-example/preview-code-example-tabs';

import Basic from './examples/basic';
import Interactive from './examples/interactive';
import basicCode from './examples/basic?raw';
import interactiveCode from './examples/interactive?raw';
import hidePrevNextButtonsCode from './examples/hidePrevNextButtons?raw';
import customButtonLabelsCode from './examples/customButtonLabels?raw';
import stylingCode from './examples/styling?raw';

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
