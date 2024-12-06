import { component$ } from '@builder.io/qwik';
import { Input } from '~/components/ui';

export default component$(() => {
  return <Input disabled type="email" placeholder="Email" />;
});
