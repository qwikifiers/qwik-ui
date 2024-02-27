import { component$ } from '@builder.io/qwik';
import { Checkbox, Label } from '@qwik-ui/styled';

export default component$(() => {
  return (
    <div>
      <div class="flex items-center space-x-2">
        <Checkbox id="terms" />
        <div>
          <Label for="terms">Accept terms and conditions</Label>
        </div>
      </div>
      <p class="text-muted-foreground ml-6 text-sm">
        Decide whether you want to appear available or not in search results.
      </p>
    </div>
  );
});
