import { component$ } from '@qwik.dev/core';
import { Input } from '~/components/ui';
import { Label } from '~/components/ui';

export default component$(() => {
  return (
    <div class="grid w-full max-w-sm items-center gap-1.5">
      <Label for="picture">Picture</Label>
      <Input id="picture" type="file" />
    </div>
  );
});
