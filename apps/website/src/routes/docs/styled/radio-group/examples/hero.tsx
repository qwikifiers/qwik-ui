import { component$ } from '@builder.io/qwik';
import { Label, RadioGroup, RadioGroupItem } from '@qwik-ui/styled';

export default component$(() => {
  return (
    <RadioGroup>
      <div class="flex items-center space-x-2">
        <RadioGroupItem name="size" value="default" id="r1" />
        <Label for="r1">Default</Label>
      </div>
      <div class="flex items-center space-x-2">
        <RadioGroupItem name="size" value="comfortable" id="r2" />
        <Label for="r2">Comfortable</Label>
      </div>
      <div class="flex items-center space-x-2">
        <RadioGroupItem name="size" value="compact" id="r3" />
        <Label for="r3">Compact</Label>
      </div>
    </RadioGroup>
  );
});
