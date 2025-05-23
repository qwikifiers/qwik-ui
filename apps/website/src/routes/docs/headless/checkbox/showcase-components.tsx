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

import Controlled from './examples/controlled';
import ControlledRawCode from './examples/controlled.tsx?raw';
export const ShowcaseControlled = component$(() => {
  return (
    <Showcase rawCode={ControlledRawCode}>
      <Controlled />
    </Showcase>
  );
});

import ControlledValues from './examples/controlled-values';
import ControlledValuesRawCode from './examples/controlled-values.tsx?raw';
export const ShowcaseControlledValues = component$(() => {
  return (
    <Showcase rawCode={ControlledValuesRawCode}>
      <ControlledValues />
    </Showcase>
  );
});

import Checklist from './examples/checklist';
import ChecklistRawCode from './examples/checklist.tsx?raw';
export const ShowcaseChecklist = component$(() => {
  return (
    <Showcase rawCode={ChecklistRawCode}>
      <Checklist />
    </Showcase>
  );
});
