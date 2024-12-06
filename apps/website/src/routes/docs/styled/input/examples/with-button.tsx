import { component$ } from '@builder.io/qwik';
import { Input } from '~/components/ui';
import { Button } from '~/components/ui';

export default component$(() => {
  return (
    <div class="flex w-full max-w-sm items-center space-x-2">
      <Input type="email" placeholder="Email" />
      <Button type="submit">Subscribe</Button>
    </div>
  );
});
