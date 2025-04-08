import { component$ } from '@qwik.dev/core';
import { Toggle } from '~/components/ui';

export default component$(() => {
  return <Toggle pressed={true}>Hello</Toggle>;
});
