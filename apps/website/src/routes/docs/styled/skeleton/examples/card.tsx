import { component$ } from '@qwik.dev/core';
import { Skeleton } from '~/components/ui';

export default component$(() => {
  return (
    <div class="flex flex-col space-y-3">
      <Skeleton class="h-32 w-64 rounded-3xl" />
      <div class="space-y-2">
        <Skeleton class="h-4 w-64" />
        <Skeleton class="h-4 w-48" />
      </div>
    </div>
  );
});
