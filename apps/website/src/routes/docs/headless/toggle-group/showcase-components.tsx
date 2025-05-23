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

import Multiple from './examples/multiple';
import MultipleRawCode from './examples/multiple.tsx?raw';
export const ShowcaseMultiple = component$(() => {
  return (
    <Showcase rawCode={MultipleRawCode}>
      <Multiple />
    </Showcase>
  );
});

import InitialValue from './examples/initialValue';
import InitialValueRawCode from './examples/initialValue.tsx?raw';
export const ShowcaseInitialValue = component$(() => {
  return (
    <Showcase rawCode={InitialValueRawCode}>
      <InitialValue />
    </Showcase>
  );
});

import Value from './examples/value';
import ValueRawCode from './examples/value.tsx?raw';
export const ShowcaseValue = component$(() => {
  return (
    <Showcase rawCode={ValueRawCode}>
      <Value />
    </Showcase>
  );
});

import ValueBind from './examples/value-bind';
import ValueBindRawCode from './examples/value-bind.tsx?raw';
export const ShowcaseValueBind = component$(() => {
  return (
    <Showcase rawCode={ValueBindRawCode}>
      <ValueBind />
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

import ItemDisabledCenter from './examples/item-disabled-center';
import ItemDisabledCenterRawCode from './examples/item-disabled-center.tsx?raw';
export const ShowcaseItemDisabledCenter = component$(() => {
  return (
    <Showcase rawCode={ItemDisabledCenterRawCode}>
      <ItemDisabledCenter />
    </Showcase>
  );
});

import Loop from './examples/loop';
import LoopRawCode from './examples/loop.tsx?raw';
export const ShowcaseLoop = component$(() => {
  return (
    <Showcase rawCode={LoopRawCode}>
      <Loop />
    </Showcase>
  );
});

import LoopItemDisabled from './examples/loop-item-disabled';
import LoopItemDisabledRawCode from './examples/loop-item-disabled.tsx?raw';
export const ShowcaseLoopItemDisabled = component$(() => {
  return (
    <Showcase rawCode={LoopItemDisabledRawCode}>
      <LoopItemDisabled />
    </Showcase>
  );
});

import Vertical from './examples/vertical';
import VerticalRawCode from './examples/vertical.tsx?raw';
export const ShowcaseVertical = component$(() => {
  return (
    <Showcase rawCode={VerticalRawCode}>
      <Vertical />
    </Showcase>
  );
});

import HorizontalRtl from './examples/horizontal-rtl';
import HorizontalRtlRawCode from './examples/horizontal-rtl.tsx?raw';
export const ShowcaseHorizontalRtl = component$(() => {
  return (
    <Showcase rawCode={HorizontalRtlRawCode}>
      <HorizontalRtl />
    </Showcase>
  );
});
