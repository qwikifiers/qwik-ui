import { component$ } from '@builder.io/qwik';
import { Showcase } from '~/components/showcase/showcase';

import Accordion from './examples/accordion';
import AccordionRawCode from './examples/accordion.tsx?raw';
export const ShowcaseAccordion = component$(() => {
  return (
    <Showcase rawCode={AccordionRawCode}>
      <Accordion />
    </Showcase>
  );
});

import AccordionQwikCity from './examples/accordion-qwik-city';
import AccordionQwikCityRawCode from './examples/accordion-qwik-city.tsx?raw';
export const ShowcaseAccordionQwikCity = component$(() => {
  return (
    <Showcase rawCode={AccordionQwikCityRawCode}>
      <AccordionQwikCity />
    </Showcase>
  );
});

import AstroAccordion from './examples/astro-accordion';
import AstroAccordionRawCode from './examples/astro-accordion.tsx?raw';
export const ShowcaseAstroAccordion = component$(() => {
  return (
    <Showcase rawCode={AstroAccordionRawCode}>
      <AstroAccordion />
    </Showcase>
  );
});
