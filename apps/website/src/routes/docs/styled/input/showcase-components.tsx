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

import File from './examples/file';
import FileRawCode from './examples/file.tsx?raw';
export const ShowcaseFile = component$(() => {
  return (
    <Showcase rawCode={FileRawCode} vertical>
      <File />
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

import WithLabel from './examples/with-label';
import WithLabelRawCode from './examples/with-label.tsx?raw';
export const ShowcaseWithLabel = component$(() => {
  return (
    <Showcase rawCode={WithLabelRawCode} vertical>
      <WithLabel />
    </Showcase>
  );
});

import WithButton from './examples/with-button';
import WithButtonRawCode from './examples/with-button.tsx?raw';
export const ShowcaseWithButton = component$(() => {
  return (
    <Showcase rawCode={WithButtonRawCode} vertical>
      <WithButton />
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

import DataBinding from './examples/data-binding';
import DataBindingRawCode from './examples/data-binding.tsx?raw';
export const ShowcaseDataBinding = component$(() => {
  return (
    <Showcase rawCode={DataBindingRawCode} vertical>
      <DataBinding />
    </Showcase>
  );
});
