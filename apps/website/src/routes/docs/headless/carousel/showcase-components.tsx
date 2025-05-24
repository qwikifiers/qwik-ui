import { component$ } from '@builder.io/qwik';
import { Showcase } from '~/components/showcase/showcase';

import Hero from './examples/hero';
import HeroRawCode from './examples/hero.tsx?raw';
export const ShowcaseHero = component$(() => {
  return (
    <Showcase rawCode={HeroRawCode}>
      <Hero />
    </Showcase>
  );
});

import Start from './examples/start';
import StartRawCode from './examples/start.tsx?raw';
export const ShowcaseStart = component$(() => {
  return (
    <Showcase rawCode={StartRawCode}>
      <Start />
    </Showcase>
  );
});

import Center from './examples/center';
import CenterRawCode from './examples/center.tsx?raw';
export const ShowcaseCenter = component$(() => {
  return (
    <Showcase rawCode={CenterRawCode}>
      <Center />
    </Showcase>
  );
});

import End from './examples/end';
import EndRawCode from './examples/end.tsx?raw';
export const ShowcaseEnd = component$(() => {
  return (
    <Showcase rawCode={EndRawCode}>
      <End />
    </Showcase>
  );
});

import Initial from './examples/initial';
import InitialRawCode from './examples/initial.tsx?raw';
export const ShowcaseInitial = component$(() => {
  return (
    <Showcase rawCode={InitialRawCode}>
      <Initial />
    </Showcase>
  );
});

import Reactive from './examples/reactive';
import ReactiveRawCode from './examples/reactive.tsx?raw';
export const ShowcaseReactive = component$(() => {
  return (
    <Showcase rawCode={ReactiveRawCode}>
      <Reactive />
    </Showcase>
  );
});

import MultipleSlides from './examples/multiple-slides';
import MultipleSlidesRawCode from './examples/multiple-slides.tsx?raw';
export const ShowcaseMultipleSlides = component$(() => {
  return (
    <Showcase rawCode={MultipleSlidesRawCode}>
      <MultipleSlides />
    </Showcase>
  );
});

import VerticalDirection from './examples/vertical-direction';
import VerticalDirectionRawCode from './examples/vertical-direction.tsx?raw';
export const ShowcaseVerticalDirection = component$(() => {
  return (
    <Showcase rawCode={VerticalDirectionRawCode}>
      <VerticalDirection />
    </Showcase>
  );
});

import NonDraggable from './examples/non-draggable';
import NonDraggableRawCode from './examples/non-draggable.tsx?raw';
export const ShowcaseNonDraggable = component$(() => {
  return (
    <Showcase rawCode={NonDraggableRawCode}>
      <NonDraggable />
    </Showcase>
  );
});

import DifferentWidths from './examples/different-widths';
import DifferentWidthsRawCode from './examples/different-widths.tsx?raw';
export const ShowcaseDifferentWidths = component$(() => {
  return (
    <Showcase rawCode={DifferentWidthsRawCode}>
      <DifferentWidths />
    </Showcase>
  );
});

import Sensitivity from './examples/sensitivity';
import SensitivityRawCode from './examples/sensitivity.tsx?raw';
export const ShowcaseSensitivity = component$(() => {
  return (
    <Showcase rawCode={SensitivityRawCode}>
      <Sensitivity />
    </Showcase>
  );
});

import Move from './examples/move';
import MoveRawCode from './examples/move.tsx?raw';
export const ShowcaseMove = component$(() => {
  return (
    <Showcase rawCode={MoveRawCode}>
      <Move />
    </Showcase>
  );
});

import WithoutScroller from './examples/without-scroller';
import WithoutScrollerRawCode from './examples/without-scroller.tsx?raw';
export const ShowcaseWithoutScroller = component$(() => {
  return (
    <Showcase rawCode={WithoutScrollerRawCode}>
      <WithoutScroller />
    </Showcase>
  );
});

import Conditional from './examples/conditional';
import ConditionalRawCode from './examples/conditional.tsx?raw';
export const ShowcaseConditional = component$(() => {
  return (
    <Showcase rawCode={ConditionalRawCode}>
      <Conditional />
    </Showcase>
  );
});

import Csr from './examples/csr';
import CsrRawCode from './examples/csr.tsx?raw';
export const ShowcaseCsr = component$(() => {
  return (
    <Showcase rawCode={CsrRawCode}>
      <Csr />
    </Showcase>
  );
});

import Mousewheel from './examples/mousewheel';
import MousewheelRawCode from './examples/mousewheel.tsx?raw';
export const ShowcaseMousewheel = component$(() => {
  return (
    <Showcase rawCode={MousewheelRawCode}>
      <Mousewheel />
    </Showcase>
  );
});

import Rewind from './examples/rewind';
import RewindRawCode from './examples/rewind.tsx?raw';
export const ShowcaseRewind = component$(() => {
  return (
    <Showcase rawCode={RewindRawCode}>
      <Rewind />
    </Showcase>
  );
});

import Player from './examples/player';
import PlayerRawCode from './examples/player.tsx?raw';
export const ShowcasePlayer = component$(() => {
  return (
    <Showcase rawCode={PlayerRawCode}>
      <Player />
    </Showcase>
  );
});

import Title from './examples/title';
import TitleRawCode from './examples/title.tsx?raw';
export const ShowcaseTitle = component$(() => {
  return (
    <Showcase rawCode={TitleRawCode}>
      <Title />
    </Showcase>
  );
});

import Animate from './examples/animate';
import AnimateRawCode from './examples/animate.tsx?raw';
export const ShowcaseAnimate = component$(() => {
  return (
    <Showcase rawCode={AnimateRawCode}>
      <Animate />
    </Showcase>
  );
});

import Pagination from './examples/pagination';
import PaginationRawCode from './examples/pagination.tsx?raw';
export const ShowcasePagination = component$(() => {
  return (
    <Showcase rawCode={PaginationRawCode}>
      <Pagination />
    </Showcase>
  );
});

import Stepper from './examples/stepper';
import StepperRawCode from './examples/stepper.tsx?raw';
export const ShowcaseStepper = component$(() => {
  return (
    <Showcase rawCode={StepperRawCode}>
      <Stepper />
    </Showcase>
  );
});

import StepperNoScroll from './examples/stepper-no-scroll';
import StepperNoScrollRawCode from './examples/stepper-no-scroll.tsx?raw';
export const ShowcaseStepperNoScroll = component$(() => {
  return (
    <Showcase rawCode={StepperNoScrollRawCode}>
      <StepperNoScroll />
    </Showcase>
  );
});

import VerticalStepper from './examples/vertical-stepper';
import VerticalStepperRawCode from './examples/vertical-stepper.tsx?raw';
export const ShowcaseVerticalStepper = component$(() => {
  return (
    <Showcase rawCode={VerticalStepperRawCode}>
      <VerticalStepper />
    </Showcase>
  );
});

import StepperPresentational from './examples/stepper-presentational';
import StepperPresentationalRawCode from './examples/stepper-presentational.tsx?raw';
export const ShowcaseStepperPresentational = component$(() => {
  return (
    <Showcase rawCode={StepperPresentationalRawCode}>
      <StepperPresentational />
    </Showcase>
  );
});

import Progress from './examples/progress';
import ProgressRawCode from './examples/progress.tsx?raw';
export const ShowcaseProgress = component$(() => {
  return (
    <Showcase rawCode={ProgressRawCode}>
      <Progress />
    </Showcase>
  );
});
