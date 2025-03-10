import { component$ } from '@qwik.dev/core';
import { Input } from '~/components/ui';
import { Label } from '~/components/ui';

export default component$(() => {
  return (
    <div class="grid w-full max-w-sm items-center gap-1.5">
      <Label for="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  );
});
