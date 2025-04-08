import { component$ } from '@qwik.dev/core';
import { Label, RadioGroup } from '~/components/ui';

export default component$(() => {
  return (
    <RadioGroup.Root>
      <div class="flex items-center space-x-2">
        <RadioGroup.Item name="size" value="default" id="r1" />
        <Label for="r1">Default</Label>
      </div>
      <div class="flex items-center space-x-2">
        <RadioGroup.Item name="size" value="comfortable" id="r2" />
        <Label for="r2">Comfortable</Label>
      </div>
      <div class="flex items-center space-x-2">
        <RadioGroup.Item name="size" value="compact" id="r3" />
        <Label for="r3">Compact</Label>
      </div>
    </RadioGroup.Root>
  );
});
