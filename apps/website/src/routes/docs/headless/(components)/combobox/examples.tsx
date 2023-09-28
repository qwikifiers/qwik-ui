import { component$, type JSXNode } from '@builder.io/qwik';

import { CodeExample } from '../../../_components/code-example/code-example';
import { Highlight } from '../../../_components/highlight/highlight';
import { PreviewCodeExample } from '../../../_components/preview-code-example/preview-code-example';
import HeroComponent from './examples/hero';
import heroCode from './examples/hero?raw';
import buildingBlocksCode from './examples/building-blocks?raw';
import StringComponent from './examples/string';
import stringCode from './examples/string?raw';
import ObjectComponent from './examples/object';
import objectCode from './examples/object?raw';
import CustomFilterComponent from './examples/custom-filter';
import customFilterCode from './examples/custom-filter?raw';
import SortFilterComponent from './examples/sort-filter';
import sortFilterCode from './examples/sort-filter?raw';
import DisabledComponent from './examples/disabled';
import disabledCode from './examples/disabled?raw';
import CustomKeysComponent from './examples/custom-keys';
import customKeysCode from './examples/custom-keys?raw';
import DisableBlurComponent from './examples/disable-blur';
import disableBlurCode from './examples/disable-blur?raw';
import SignalBindsComponent from './examples/signal-binds';
import signalBindsCode from './examples/signal-binds?raw';
import DefaultLabelComponent from './examples/default-label';
import defaultLabelCode from './examples/default-label?raw';
import HighlightedIndexComponent from './examples/highlighted-index';
import highlightedIndexCode from './examples/highlighted-index?raw';
import SearchBarComponent from './examples/search-bar';
import searchBarCode from './examples/search-bar?raw';

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
  string: {
    component: <StringComponent />,
    code: stringCode,
  },
  object: {
    component: <ObjectComponent />,
    code: objectCode,
  },
  customFilter: {
    component: <CustomFilterComponent />,
    code: customFilterCode,
  },
  sortFilter: {
    component: <SortFilterComponent />,
    code: sortFilterCode,
  },
  disabled: {
    component: <DisabledComponent />,
    code: disabledCode,
  },
  customKeys: {
    component: <CustomKeysComponent />,
    code: customKeysCode,
  },
  disableBlur: {
    component: <DisableBlurComponent />,
    code: disableBlurCode,
  },
  signalBinds: {
    component: <SignalBindsComponent />,
    code: signalBindsCode,
  },
  defaultLabel: {
    component: <DefaultLabelComponent />,
    code: defaultLabelCode,
  },
  highlightedIndex: {
    component: <HighlightedIndexComponent />,
    code: highlightedIndexCode,
  },
  searchBar: {
    component: <SearchBarComponent />,
    code: searchBarCode,
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
