import { component$ } from '@qwik.dev/core';
import { Input } from '~/components/ui';

export default component$(() => {
  return <Input disabled type="email" placeholder="Email" />;
});
