import { component$, useSignal } from '@qwik.dev/core';
import { Input, Label } from '~/components/ui';

export default component$(() => {
  const valueSig = useSignal('test@test.com');
  return (
    <div class="grid w-full max-w-sm items-center gap-1.5">
      <Label for="email-2">Email</Label>
      <Input type="email" id="email-2" placeholder="Email" bind:value={valueSig} />
      <p class="text-sm text-muted-foreground">Your email is: {valueSig.value}</p>
    </div>
  );
});
