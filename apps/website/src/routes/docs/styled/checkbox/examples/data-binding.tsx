import { component$, useSignal } from '@builder.io/qwik';
import { Checkbox, Label } from '~/components/ui';

export default component$(() => {
  const checkedSig = useSignal(false);
  return (
    <div>
      <div class="flex items-center space-x-2">
        <Checkbox id="terms" bind:checked={checkedSig} />
        <div>
          <Label for="terms">Accept terms and conditions</Label>
        </div>
      </div>
      <p class="text-sm text-muted-foreground">checked: {checkedSig.value.toString()}</p>
    </div>
  );
});
