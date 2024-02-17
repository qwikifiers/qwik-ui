import { component$ } from '@builder.io/qwik';
import { Input, Label } from '@qwik-ui/styled';

export default component$(() => {
  return (
    <div class="grid w-full max-w-sm items-center gap-1.5">
      <Label for="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  );
});
