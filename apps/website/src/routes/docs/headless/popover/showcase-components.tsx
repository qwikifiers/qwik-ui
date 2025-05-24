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

import Basic from './examples/basic';
import BasicRawCode from './examples/basic.tsx?raw';
export const ShowcaseBasic = component$(() => {
  return (
    <Showcase rawCode={BasicRawCode}>
      <Basic />
    </Showcase>
  );
});

import Inspect from './examples/inspect';
import InspectRawCode from './examples/inspect.tsx?raw';
export const ShowcaseInspect = component$(() => {
  return (
    <Showcase rawCode={InspectRawCode}>
      <Inspect />
    </Showcase>
  );
});

import Auto from './examples/auto';
import AutoRawCode from './examples/auto.tsx?raw';
export const ShowcaseAuto = component$(() => {
  return (
    <Showcase rawCode={AutoRawCode}>
      <Auto />
    </Showcase>
  );
});

import Manual from './examples/manual';
import ManualRawCode from './examples/manual.tsx?raw';
export const ShowcaseManual = component$(() => {
  return (
    <Showcase rawCode={ManualRawCode}>
      <Manual />
    </Showcase>
  );
});

import Programmatic from './examples/programmatic';
import ProgrammaticRawCode from './examples/programmatic.tsx?raw';
export const ShowcaseProgrammatic = component$(() => {
  return (
    <Showcase rawCode={ProgrammaticRawCode}>
      <Programmatic />
    </Showcase>
  );
});

import ToggleEvent from './examples/toggle-event';
import ToggleEventRawCode from './examples/toggle-event.tsx?raw';
export const ShowcaseToggleEvent = component$(() => {
  return (
    <Showcase rawCode={ToggleEventRawCode}>
      <ToggleEvent />
    </Showcase>
  );
});

import Floating from './examples/floating';
import FloatingRawCode from './examples/floating.tsx?raw';
export const ShowcaseFloating = component$(() => {
  return (
    <Showcase rawCode={FloatingRawCode}>
      <Floating />
    </Showcase>
  );
});

import Placement from './examples/placement';
import PlacementRawCode from './examples/placement.tsx?raw';
export const ShowcasePlacement = component$(() => {
  return (
    <Showcase rawCode={PlacementRawCode}>
      <Placement />
    </Showcase>
  );
});

import Corners from './examples/corners';
import CornersRawCode from './examples/corners.tsx?raw';
export const ShowcaseCorners = component$(() => {
  return (
    <Showcase rawCode={CornersRawCode}>
      <Corners />
    </Showcase>
  );
});

import Flip from './examples/flip';
import FlipRawCode from './examples/flip.tsx?raw';
export const ShowcaseFlip = component$(() => {
  return (
    <Showcase rawCode={FlipRawCode}>
      <Flip />
    </Showcase>
  );
});

import Gutter from './examples/gutter';
import GutterRawCode from './examples/gutter.tsx?raw';
export const ShowcaseGutter = component$(() => {
  return (
    <Showcase rawCode={GutterRawCode}>
      <Gutter />
    </Showcase>
  );
});

import Styling from './examples/styling';
import StylingRawCode from './examples/styling.tsx?raw';
export const ShowcaseStyling = component$(() => {
  return (
    <Showcase rawCode={StylingRawCode}>
      <Styling />
    </Showcase>
  );
});

import Animation from './examples/animation';
import AnimationRawCode from './examples/animation.tsx?raw';
export const ShowcaseAnimation = component$(() => {
  return (
    <Showcase rawCode={AnimationRawCode}>
      <Animation />
    </Showcase>
  );
});

import Transition from './examples/transition';
import TransitionRawCode from './examples/transition.tsx?raw';
export const ShowcaseTransition = component$(() => {
  return (
    <Showcase rawCode={TransitionRawCode}>
      <Transition />
    </Showcase>
  );
});
