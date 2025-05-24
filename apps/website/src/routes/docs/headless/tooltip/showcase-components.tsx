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

import OnChange from './examples/onChange';
import OnChangeRawCode from './examples/onChange.tsx?raw';
export const ShowcaseOnChange = component$(() => {
  return (
    <Showcase rawCode={OnChangeRawCode}>
      <OnChange />
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

import Complex from './examples/complex';
import ComplexRawCode from './examples/complex.tsx?raw';
export const ShowcaseComplex = component$(() => {
  return (
    <Showcase rawCode={ComplexRawCode}>
      <Complex />
    </Showcase>
  );
});
