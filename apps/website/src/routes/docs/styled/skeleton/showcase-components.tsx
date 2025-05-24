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

import Card from './examples/card';
import CardRawCode from './examples/card.tsx?raw';
export const ShowcaseCard = component$(() => {
  return (
    <Showcase rawCode={CardRawCode}>
      <Card />
    </Showcase>
  );
});
