import { JSXNode, component$, useStyles$ } from '@builder.io/qwik';

import Hero from './examples/hero';
import heroExampleCode from './examples/hero?raw';

import Inspect from './examples/inspect';
import inspectExampleCode from './examples/inspect?raw';

import AutoFocus from './examples/auto-focus';
import autoFocusExampleCode from './examples/auto-focus?raw';

import Backdrop from './examples/backdrop';
import backdropCssCode from './examples/backdrop.css?raw';
import backdropExampleCode from './examples/backdrop?raw';

import BackdropClose from './examples/backdrop-close';
import backdropCloseExampleCode from './examples/backdrop-close?raw';

import AlertDialog from './examples/alert-dialog';
import alertDialogExampleCode from './examples/alert-dialog?raw';

import Animation from './examples/animation';
import animationExampleCode from './examples/animation?raw';

import Transition from './examples/transition';
import transitionExampleCode from './examples/transition?raw';

import Sheet from './examples/sheet';
import sheetExampleCode from './examples/sheet?raw';

import BottomSheet from './examples/bottom-sheet';
import bottomSheetExampleCode from './examples/bottom-sheet?raw';

import buildingBlocksSnip from './examples/building-blocks-snip?raw';
import pageLoadSnip from './examples/page-load-snip?raw';
import animationSnip from './examples/animation-snip.css?raw';

import styles from './index.css?inline';
import { PreviewCodeExampleTabs } from '~/components/preview-code-example/preview-code-example-tabs';
import { CodeExampleContainer } from '~/components/code-example/code-example-container';

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
  autoFocus: {
    component: <AutoFocus />,
    code: autoFocusExampleCode,
  },
  backdrop: {
    component: <Backdrop />,
    code: backdropExampleCode,
  },
  backdropClose: {
    component: <BackdropClose />,
    code: backdropCloseExampleCode,
  },
  alertDialog: {
    component: <AlertDialog />,
    code: alertDialogExampleCode,
  },
  animation: {
    component: <Animation />,
    code: animationExampleCode,
  },
  transition: {
    component: <Transition />,
    code: transitionExampleCode,
  },
  sheet: {
    component: <Sheet />,
    code: sheetExampleCode,
  },
  bottomSheet: {
    component: <BottomSheet />,
    code: bottomSheetExampleCode,
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

export const BackdropCss = component$(() => (
  <CodeExampleContainer code={backdropCssCode} />
));

export const BuildingBlocksSnip = component$(() => (
  <CodeExampleContainer code={buildingBlocksSnip} />
));

export const PageLoadSnip = component$(() => (
  <CodeExampleContainer code={pageLoadSnip} />
));

export const AnimationSnip = component$(() => (
  <CodeExampleContainer code={animationSnip} />
));
