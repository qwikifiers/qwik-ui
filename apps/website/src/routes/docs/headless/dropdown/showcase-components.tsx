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

import Simple from './examples/simple';
import SimpleRawCode from './examples/simple.tsx?raw';
export const ShowcaseSimple = component$(() => {
  return (
    <Showcase rawCode={SimpleRawCode}>
      <Simple />
    </Showcase>
  );
});
