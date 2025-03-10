import { component$ } from '@qwik.dev/core';
import { Button } from '~/components/ui';
import { LuMail } from '@qwikest/icons/lucide';

export default component$(() => {
  return (
    <Button>
      <LuMail class="mr-2" /> Login with Email
    </Button>
  );
});
