import { component$ } from '@qwik.dev/core';
import { Checkbox } from '~/components/ui';
import { Label } from '~/components/ui';

export default component$(() => {
  return (
    <div>
      <div class="flex items-center space-x-2">
        <Checkbox id="terms" />
        <div>
          <Label for="terms">Accept terms and conditions</Label>
        </div>
      </div>
      <p class="ml-6 text-sm text-muted-foreground">
        Decide whether you want to appear available or not in search results.
      </p>
    </div>
  );
});
