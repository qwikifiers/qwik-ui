import { component$ } from '@builder.io/qwik';
import { Alert } from '~/components/ui';
import { LuAlertTriangle } from '@qwikest/icons/lucide';

export default component$(() => {
  return (
    <Alert.Root look="primary">
      <LuAlertTriangle class="h-4 w-4" />
      <Alert.Title>Heads up!</Alert.Title>
      <Alert.Description>
        You can add components and dependencies to your app using the cli.
      </Alert.Description>
    </Alert.Root>
  );
});
