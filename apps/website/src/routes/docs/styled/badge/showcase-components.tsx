import { component$ } from '@builder.io/qwik';
import { Showcase } from '~/components/showcase/showcase';

// primary, secondary, alert, outline
import Primary from './examples/primary';
import PrimaryRawCode from './examples/primary.tsx?raw';
export const ShowcasePrimary = component$(() => {
  return (
    <Showcase rawCode={PrimaryRawCode}>
      <Primary />
    </Showcase>
  );
});

import Secondary from './examples/secondary';
import SecondaryRawCode from './examples/secondary.tsx?raw';
export const ShowcaseSecondary = component$(() => {
  return (
    <Showcase rawCode={SecondaryRawCode}>
      <Secondary />
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

import Outline from './examples/outline';
import OutlineRawCode from './examples/outline.tsx?raw';
export const ShowcaseOutline = component$(() => {
  return (
    <Showcase rawCode={OutlineRawCode}>
      <Outline />
    </Showcase>
  );
});
