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

import Sheet from './examples/sheet';
import SheetRawCode from './examples/sheet.tsx?raw';
export const ShowcaseSheet = component$(() => {
  return (
    <Showcase rawCode={SheetRawCode}>
      <Sheet />
    </Showcase>
  );
});
