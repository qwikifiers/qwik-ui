import { component$ } from '@builder.io/qwik';
import { Alert, AlertDescription, AlertTitle } from '@qwik-ui/styled';
import { LuAlertTriangle } from '@qwikest/icons/lucide';

export default component$(() => {
  return (
    <Alert look="alert">
      <LuAlertTriangle class="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
    </Alert>
  );
});
