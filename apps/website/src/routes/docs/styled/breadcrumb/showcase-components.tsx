import { component$ } from '@builder.io/qwik';
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
