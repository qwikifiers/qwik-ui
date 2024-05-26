import { component$ } from '@builder.io/qwik';
import { Input } from '~/components/ui';

export default component$(() => {
  return (
    <>
      <Input type="email" placeholder="Email" value="test@test.com" />
    </>
  );
});
