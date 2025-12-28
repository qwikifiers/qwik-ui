import { component$ } from '@qwik.dev/core';
import { Showcase } from '~/components/showcase/showcase';

import Primary from './examples/primary';
import PrimaryRawCode from './examples/primary.tsx?raw';
export const ShowcasePrimary = component$(() => {
  return (
    <Showcase rawCode={PrimaryRawCode}>
      <Primary />
    </Showcase>
  );
});
