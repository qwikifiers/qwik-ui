import { component$ } from '@qwik.dev/core';
import { Button } from '~/components/ui';
import { LuLoader2 } from '@qwikest/icons/lucide';

export default component$(() => {
  return (
    <Button disabled>
      <LuLoader2 class="mr-2 h-5 w-5 animate-spin" /> Login with Email
    </Button>
  );
});
