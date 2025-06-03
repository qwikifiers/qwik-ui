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

import InitialPressed from './examples/initialPressed';
import InitialPressedRawCode from './examples/initialPressed.tsx?raw';
export const ShowcaseInitialPressed = component$(() => {
  return (
    <Showcase rawCode={InitialPressedRawCode}>
      <InitialPressed />
    </Showcase>
  );
});

import Pressed from './examples/pressed';
import PressedRawCode from './examples/pressed.tsx?raw';
export const ShowcasePressed = component$(() => {
  return (
    <Showcase rawCode={PressedRawCode}>
      <Pressed />
    </Showcase>
  );
});

import BindPressed from './examples/bind-pressed';
import BindPressedRawCode from './examples/bind-pressed.tsx?raw';
export const ShowcaseBindPressed = component$(() => {
  return (
    <Showcase rawCode={BindPressedRawCode}>
      <BindPressed />
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
