import { component$ } from '@builder.io/qwik';
import { Showcase } from '~/components/showcase/showcase';

import TheProblem from './examples/the-problem';
import TheProblemRawCode from './examples/the-problem.tsx?raw';
export const ShowcaseTheProblem = component$(() => {
  return (
    <Showcase rawCode={TheProblemRawCode}>
      <TheProblem />
    </Showcase>
  );
});

import Inline from './examples/inline';
import InlineRawCode from './examples/inline.tsx?raw';
export const ShowcaseInline = component$(() => {
  return (
    <Showcase rawCode={InlineRawCode}>
      <Inline />
    </Showcase>
  );
});

import Server from './examples/server';
import ServerRawCode from './examples/server.tsx?raw';
export const ShowcaseServer = component$(() => {
  return (
    <Showcase rawCode={ServerRawCode}>
      <Server />
    </Showcase>
  );
});
