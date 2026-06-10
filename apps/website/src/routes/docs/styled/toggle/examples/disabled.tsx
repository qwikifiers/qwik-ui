import { component$ } from '@qwik.dev/core';
import { Toggle } from '~/components/ui';

export default component$(() => {
  return <Toggle disabled>Hello</Toggle>;
});
