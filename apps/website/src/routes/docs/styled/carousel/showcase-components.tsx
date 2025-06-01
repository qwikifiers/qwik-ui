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

import HeroVertical from './examples/hero-vertical';
import HeroVerticalRawCode from './examples/hero-vertical.tsx?raw';
export const ShowcaseHeroVertical = component$(() => {
  return (
    <Showcase rawCode={HeroVerticalRawCode}>
      <HeroVertical />
    </Showcase>
  );
});

import Pagination from './examples/pagination';
import PaginationRawCode from './examples/pagination.tsx?raw';
export const ShowcasePagination = component$(() => {
  return (
    <Showcase rawCode={PaginationRawCode}>
      <Pagination />
    </Showcase>
  );
});

import Stepper from './examples/stepper';
import StepperRawCode from './examples/stepper.tsx?raw';
export const ShowcaseStepper = component$(() => {
  return (
    <Showcase rawCode={StepperRawCode}>
      <Stepper />
    </Showcase>
  );
});
