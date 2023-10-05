import { component$, useStyles$, type JSXNode } from '@builder.io/qwik';

import { CodeExampleContainer } from '../../../_components/code-example/code-example-container';
import { PreviewCodeExampleTabs } from '../../../_components/preview-code-example/preview-code-example-tabs';
import AutomaticBehaviorComponent from './examples/automatic-behavior-example';
import automaticBehaviorCode from './examples/automatic-behavior-example?raw';
import DisabledTabsComponent from './examples/disabled-example';
import disabledTabsCode from './examples/disabled-example?raw';
import DynamicTabsComponent from './examples/dynamic-example';
import dynamicTabsCode from './examples/dynamic-example?raw';
import FirstExampleComponent from './examples/first-example';
import firstExampleCode from './examples/first-example?raw';
import longExampleCode from './examples/long-example?raw';
import ManualBehaviorComponent from './examples/manual-behavior-example';
import manualBehaviorCode from './examples/manual-behavior-example?raw';
import OnClickTabsComponent from './examples/on-click-tabs-example';
import onClickTabsCode from './examples/on-click-tabs-example?raw';
import OnSelectedIndexChangeComponent from './examples/on-selected-index-change-example';
import onSelectedIndexChangeCode from './examples/on-selected-index-change-example?raw';
import SelectedPropComponent from './examples/selected-prop-example';
import selectedPropCode from './examples/selected-prop-example?raw';
import SelectedTabIdComponent from './examples/selected-tab-id-example';
import selectedTabIdCode from './examples/selected-tab-id-example?raw';
import shortExampleCode from './examples/short-example?raw';
import VerticalTabsComponent from './examples/vertical-example';
import verticalTabsCode from './examples/vertical-example?raw';
import styles from './index.css?inline';

export type Example = {
  component: JSXNode;
  code: string;
  cssClasses?: string;
};

export const examples: Record<string, Example> = {
  first: {
    component: <FirstExampleComponent />,
    code: firstExampleCode,
  },
  vertical: {
    component: <VerticalTabsComponent />,
    code: verticalTabsCode,
  },
  disabled: {
    component: <DisabledTabsComponent />,
    code: disabledTabsCode,
    cssClasses: 'w-full',
  },
  automatic: {
    component: <AutomaticBehaviorComponent />,
    code: automaticBehaviorCode,
  },
  manual: {
    component: <ManualBehaviorComponent />,
    code: manualBehaviorCode,
  },
  dynamic: {
    component: <DynamicTabsComponent />,
    code: dynamicTabsCode,
  },
  onSelectedIndexChange: {
    component: <OnSelectedIndexChangeComponent />,
    code: onSelectedIndexChangeCode,
  },
  selectedTabId: {
    component: <SelectedTabIdComponent />,
    code: selectedTabIdCode,
  },
  selectedProp: {
    component: <SelectedPropComponent />,
    code: selectedPropCode,
  },
  onClick: {
    component: <OnClickTabsComponent />,
    code: onClickTabsCode,
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
      <div q:slot="actualComponent" class={['tabs-example mr-auto', cssClasses]}>
        {component}
      </div>
    </PreviewCodeExampleTabs>
  );
});

export const ShortExample = component$(() => (
  <CodeExampleContainer code={shortExampleCode} />
));

export const LongExample = component$(() => (
  <CodeExampleContainer code={longExampleCode} />
));
