import { component$, useSignal } from '@builder.io/qwik';
import { Checkbox } from '@qwik-ui/headless';

export default component$(() => {
  const bindChecked = useSignal(true);
  return (
    <>
      <Checkbox.Root class="bg-slate-900 text-white" bind:checked={bindChecked}>
        <div class="flex items-center gap-3">
          <Checkbox.Indicator class="w-fit bg-slate-600">
            <p id="indicator">✅</p>
          </Checkbox.Indicator>
        </div>
      </Checkbox.Root>
    </>
  );
});
