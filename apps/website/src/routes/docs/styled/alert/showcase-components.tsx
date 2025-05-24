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

import Alert from './examples/alert';
import AlertRawCode from './examples/alert.tsx?raw';
export const ShowcaseAlert = component$(() => {
  return (
    <Showcase rawCode={AlertRawCode}>
      <Alert />
    </Showcase>
  );
});

import Primary from './examples/primary';
import PrimaryRawCode from './examples/primary.tsx?raw';
export const ShowcasePrimary = component$(() => {
  return (
    <Showcase rawCode={PrimaryRawCode}>
      <Primary />
    </Showcase>
  );
});
