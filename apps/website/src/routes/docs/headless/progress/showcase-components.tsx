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

import Min from './examples/min';
import MinRawCode from './examples/min.tsx?raw';
export const ShowcaseMin = component$(() => {
  return (
    <Showcase rawCode={MinRawCode}>
      <Min />
    </Showcase>
  );
});

import Max from './examples/max';
import MaxRawCode from './examples/max.tsx?raw';
export const ShowcaseMax = component$(() => {
  return (
    <Showcase rawCode={MaxRawCode}>
      <Max />
    </Showcase>
  );
});

import Complete from './examples/complete';
import CompleteRawCode from './examples/complete.tsx?raw';
export const ShowcaseComplete = component$(() => {
  return (
    <Showcase rawCode={CompleteRawCode}>
      <Complete />
    </Showcase>
  );
});

import Indeterminate from './examples/indeterminate';
import IndeterminateRawCode from './examples/indeterminate.tsx?raw';
export const ShowcaseIndeterminate = component$(() => {
  return (
    <Showcase rawCode={IndeterminateRawCode}>
      <Indeterminate />
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

import Csr from './examples/csr';
import CsrRawCode from './examples/csr.tsx?raw';
export const ShowcaseCsr = component$(() => {
  return (
    <Showcase rawCode={CsrRawCode}>
      <Csr />
    </Showcase>
  );
});
