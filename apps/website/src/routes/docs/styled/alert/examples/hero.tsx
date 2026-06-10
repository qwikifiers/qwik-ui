import { component$ } from '@qwik.dev/core';
import { LuRocket } from '@qwikest/icons/lucide';

import { Alert } from '~/components/ui';
export default component$(() => {
  return (
    <Alert.Root>
      <LuRocket class="h-4 w-4" />
      <Alert.Title>Heads up!</Alert.Title>
      <Alert.Description>
        You can add components to your app using the cli.
      </Alert.Description>
    </Alert.Root>
  );
});
