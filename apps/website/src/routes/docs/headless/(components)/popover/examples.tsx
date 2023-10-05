import { component$, type JSXNode } from '@builder.io/qwik';
import { Highlight } from '../../../_components/highlight/highlight';
import { PreviewCodeExample } from '../../../_components/preview-code-example/preview-code-example';
import { CodeExample } from './exports';

import HeroComponent from './examples/hero';
import heroCode from './examples/hero?raw';

import InspectComponent from './examples/inspect';
import inspectCode from './examples/inspect?raw';

import MatchesComponent from './examples/matches';
import matchesCode from './examples/matches?raw';

import AutoComponent from './examples/auto';
import autoCode from './examples/auto?raw';

import ManualComponent from './examples/manual';
import manualCode from './examples/manual?raw';

import PlacementComponent from './examples/placement';
import placementCode from './examples/placement?raw';

import FlipComponent from './examples/flip';
import flipCode from './examples/flip?raw';

import GutterComponent from './examples/gutter';
import gutterCode from './examples/gutter?raw';

import StylingComponent from './examples/styling';
import stylingCode from './examples/styling?raw';

import AnimationComponent from './examples/animation';
import animationCode from './examples/animation?raw';

import AnimationListboxComponent from './examples/listbox-animation';
import animationListboxCode from './examples/listbox-animation?raw';

import AutoPlacementComponent from './examples/auto-placement';
import autoPlacementCode from './examples/auto-placement?raw';

import AnchorRefComponent from './examples/anchor-ref';
import anchorRefCode from './examples/anchor-ref?raw';

import buildingBlocksCode from './examples/buildingBlocks?raw';

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
  inspect: {
    component: <InspectComponent />,
    code: inspectCode,
  },
  matches: {
    component: <MatchesComponent />,
    code: matchesCode,
  },
  auto: {
    component: <AutoComponent />,
    code: autoCode,
  },
  manual: {
    component: <ManualComponent />,
    code: manualCode,
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
  styling: {
    component: <StylingComponent />,
    code: stylingCode,
  },
  animation: {
    component: <AnimationComponent />,
    code: animationCode,
  },
  animationListbox: {
    component: <AnimationListboxComponent />,
    code: animationListboxCode,
  },
  autoPlacement: {
    component: <AutoPlacementComponent />,
    code: autoPlacementCode,
  },
  anchorRef: {
    component: <AnchorRefComponent />,
    code: anchorRefCode,
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
