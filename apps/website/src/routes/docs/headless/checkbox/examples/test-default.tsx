import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Checkbox, Checklist } from '@qwik-ui/headless';
export default component$(() => {
  return (
    <>
      <p>I'm the default checkbox!!!</p>
      <Checkbox.Root class=" text-white">
        <div class="flex items-center gap-3">
          <Checkbox.Indicator class="w-fit bg-slate-600">
            <p id="indicator">✅</p>
          </Checkbox.Indicator>
          <p>No other stuff is needed here</p>
        </div>
      </Checkbox.Root>
    </>
  );
});
