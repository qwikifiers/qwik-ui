import { component$, type JSXNode } from '@builder.io/qwik';

import AnimationComponent from './examples/animation';
import animationCode from './examples/animation?raw';

import AutoPlacementComponent from './examples/auto-placement';
import autoPlacementCode from './examples/auto-placement?raw';

import buildingBlocksCode from './examples/building-blocks-snip?raw';
import providerCode from './examples/qwik-ui-provider-snip?raw';
import contextIdsCode from './examples/context-ids-snip?raw';
import resolvedOptionCode from './examples/resolved-option-snip?raw';
import customKeysSnipCode from './examples/custom-keys-snip?raw';

import CustomFilterComponent from './examples/custom-filter';
import customFilterCode from './examples/custom-filter?raw';

import CustomKeysComponent from './examples/custom-keys';
import customKeysCode from './examples/custom-keys?raw';

import DefaultLabelComponent from './examples/default-label';
import defaultLabelCode from './examples/default-label?raw';

import DisableBlurComponent from './examples/disable-blur';
import disableBlurCode from './examples/disable-blur?raw';

import DisabledComponent from './examples/disabled';
import disabledCode from './examples/disabled?raw';

import FlipComponent from './examples/flip';
import flipCode from './examples/flip?raw';

import GutterComponent from './examples/gutter';
import gutterCode from './examples/gutter?raw';

import HeroComponent from './examples/hero';
import heroCode from './examples/hero?raw';

import HighlightedIndexComponent from './examples/highlighted-index';
import highlightedIndexCode from './examples/highlighted-index?raw';

import ObjectComponent from './examples/object';
import objectCode from './examples/object?raw';

import PlacementComponent from './examples/placement';
import placementCode from './examples/placement?raw';

import SearchBarComponent from './examples/search-bar';
import searchBarCode from './examples/search-bar?raw';

import SignalBindsComponent from './examples/signal-binds';
import signalBindsCode from './examples/signal-binds?raw';

import SortFilterComponent from './examples/sort-filter';
import sortFilterCode from './examples/sort-filter?raw';

import StringComponent from './examples/string';
import stringCode from './examples/string?raw';
import { PreviewCodeExampleTabs } from '~/components/preview-code-example/preview-code-example-tabs';
import { CodeExampleContainer } from '~/components/code-example/code-example-container';
import { Highlight } from '~/components/highlight/highlight';

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
  placement: {
    component: <PlacementComponent />,
    code: placementCode,
  },
  flip: {
    component: <FlipComponent />,
    code: flipCode,
  },
  gutter: {
    component: <GutterComponent />,
    code: gutterCode,
  },
  animation: {
    component: <AnimationComponent />,
    code: animationCode,
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
  autoPlacement: {
    component: <AutoPlacementComponent />,
    code: autoPlacementCode,
  },
};

export type ShowExampleProps = {
  example: string;
};

export const ShowExample = component$(({ example }: ShowExampleProps) => {
  const { component, code, cssClasses = '' } = comboboxExamples[example];
  return (
    <PreviewCodeExampleTabs code={code}>
      <div class={['flex flex-col gap-4', cssClasses]} q:slot="actualComponent">
        {component}
      </div>

      <Highlight q:slot="codeExample" code={code} />
    </PreviewCodeExampleTabs>
  );
});

export const BuildingBlocksSnip = component$(() => (
  <CodeExampleContainer code={buildingBlocksCode} />
));

export const ProviderSnip = component$(() => (
  <CodeExampleContainer code={providerCode} />
));

export const ContextIdsSnip = component$(() => (
  <CodeExampleContainer code={contextIdsCode} />
));

export const ResolvedOptionSnip = component$(() => (
  <CodeExampleContainer code={resolvedOptionCode} />
));

export const CustomKeysSnip = component$(() => (
  <CodeExampleContainer code={customKeysSnipCode} />
));
