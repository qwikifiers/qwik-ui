import { component$ } from '@builder.io/qwik';
import { Input } from '@qwik-ui/styled';

export default component$(() => {
  return <Input type="email" placeholder="Email" />;
});
