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

import Programmatic from './examples/programmatic';
import ProgrammaticRawCode from './examples/programmatic.tsx?raw';
export const ShowcaseProgrammatic = component$(() => {
  return (
    <Showcase rawCode={ProgrammaticRawCode}>
      <Programmatic />
    </Showcase>
  );
});

import OnChange from './examples/on-change';
import OnChangeRawCode from './examples/on-change.tsx?raw';
export const ShowcaseOnChange = component$(() => {
  return (
    <Showcase rawCode={OnChangeRawCode}>
      <OnChange />
    </Showcase>
  );
});

import Multiple from './examples/multiple';
import MultipleRawCode from './examples/multiple.tsx?raw';
export const ShowcaseMultiple = component$(() => {
  return (
    <Showcase rawCode={MultipleRawCode}>
      <Multiple />
    </Showcase>
  );
});

import Collapsible from './examples/collapsible';
import CollapsibleRawCode from './examples/collapsible.tsx?raw';
export const ShowcaseCollapsible = component$(() => {
  return (
    <Showcase rawCode={CollapsibleRawCode}>
      <Collapsible />
    </Showcase>
  );
});

import Disabled from './examples/disabled';
import DisabledRawCode from './examples/disabled.tsx?raw';
export const ShowcaseDisabled = component$(() => {
  return (
    <Showcase rawCode={DisabledRawCode}>
      <Disabled />
    </Showcase>
  );
});

import DisabledRoot from './examples/disabled-root';
import DisabledRootRawCode from './examples/disabled-root.tsx?raw';
export const ShowcaseDisabledRoot = component$(() => {
  return (
    <Showcase rawCode={DisabledRootRawCode}>
      <DisabledRoot />
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

import Csr from './examples/csr';
import CsrRawCode from './examples/csr.tsx?raw';
export const ShowcaseCsr = component$(() => {
  return (
    <Showcase rawCode={CsrRawCode}>
      <Csr />
    </Showcase>
  );
});

import Dynamic from './examples/dynamic';
import DynamicRawCode from './examples/dynamic.tsx?raw';
export const ShowcaseDynamic = component$(() => {
  return (
    <Showcase rawCode={DynamicRawCode}>
      <Dynamic />
    </Showcase>
  );
});
