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

import Open from './examples/open';
import OpenRawCode from './examples/open.tsx?raw';
export const ShowcaseOpen = component$(() => {
  return (
    <Showcase rawCode={OpenRawCode}>
      <Open />
    </Showcase>
  );
});

import BindOpen from './examples/bind-open';
import BindOpenRawCode from './examples/bind-open.tsx?raw';
export const ShowcaseBindOpen = component$(() => {
  return (
    <Showcase rawCode={BindOpenRawCode}>
      <BindOpen />
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

import OpenChange from './examples/open-change';
import OpenChangeRawCode from './examples/open-change.tsx?raw';
export const ShowcaseOpenChange = component$(() => {
  return (
    <Showcase rawCode={OpenChangeRawCode}>
      <OpenChange />
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
