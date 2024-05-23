import { component$ } from '@builder.io/qwik';
import { Checkbox } from '~/components/ui';

export default component$(() => {
  return (
    <div class="flex items-center space-x-2">
      <Checkbox id="terms2" disabled />
      <label
        for="terms2"
        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  );
});
