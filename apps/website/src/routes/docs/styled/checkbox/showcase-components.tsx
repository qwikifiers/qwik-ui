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

import WithText from './examples/with-text';
import WithTextRawCode from './examples/with-text.tsx?raw';
export const ShowcaseWithText = component$(() => {
  return (
    <Showcase rawCode={WithTextRawCode} vertical>
      <WithText />
    </Showcase>
  );
});

import Disabled from './examples/disabled';
import DisabledRawCode from './examples/disabled.tsx?raw';
export const ShowcaseDisabled = component$(() => {
  return (
    <Showcase rawCode={DisabledRawCode} vertical>
      <Disabled />
    </Showcase>
  );
});

import DataBinding from './examples/data-binding';
import DataBindingRawCode from './examples/data-binding.tsx?raw';
export const ShowcaseDataBinding = component$(() => {
  return (
    <Showcase rawCode={DataBindingRawCode} vertical>
      <DataBinding />
    </Showcase>
  );
});
