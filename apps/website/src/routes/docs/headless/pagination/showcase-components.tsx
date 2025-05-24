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

import Styling from './examples/styling';
import StylingRawCode from './examples/styling.tsx?raw';
export const ShowcaseStyling = component$(() => {
  return (
    <Showcase rawCode={StylingRawCode}>
      <Styling />
    </Showcase>
  );
});

import CustomButtonLabels from './examples/custom-button-labels';
import CustomButtonLabelsRawCode from './examples/custom-button-labels.tsx?raw';
export const ShowcaseCustomButtonLabels = component$(() => {
  return (
    <Showcase rawCode={CustomButtonLabelsRawCode}>
      <CustomButtonLabels />
    </Showcase>
  );
});

import CustomArrows from './examples/custom-arrows';
import CustomArrowsRawCode from './examples/custom-arrows.tsx?raw';
export const ShowcaseCustomArrows = component$(() => {
  return (
    <Showcase rawCode={CustomArrowsRawCode}>
      <CustomArrows />
    </Showcase>
  );
});

import HidePrevNextButtons from './examples/hide-prev-next-buttons';
import HidePrevNextButtonsRawCode from './examples/hide-prev-next-buttons.tsx?raw';
export const ShowcaseHidePrevNextButtons = component$(() => {
  return (
    <Showcase rawCode={HidePrevNextButtonsRawCode}>
      <HidePrevNextButtons />
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
