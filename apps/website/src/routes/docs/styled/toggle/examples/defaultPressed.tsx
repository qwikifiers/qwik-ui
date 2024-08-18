import { component$ } from '@builder.io/qwik';
import { Toggle } from '~/components/ui';

export default component$(() => {
  return <Toggle defaultPressed={true}>Hello</Toggle>;
});
