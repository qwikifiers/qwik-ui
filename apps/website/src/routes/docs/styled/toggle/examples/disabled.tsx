import { component$ } from '@builder.io/qwik';
import { Toggle } from '~/components/ui';

export default component$(() => {
  return <Toggle disabled>Hello</Toggle>;
});
