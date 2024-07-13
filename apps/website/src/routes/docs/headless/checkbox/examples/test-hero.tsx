import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Checkbox } from '@qwik-ui/headless';

export default component$(() => {
  const userSig = useSignal(true);
  return (
    <>
      <Checkbox.Root class="bg-slate-900 text-white" bind:checked={userSig}>
        <div class="flex items-center gap-3">
          <Checkbox.Indicator class="w-fit bg-slate-600">
            <p id="indicator">✅</p>
          </Checkbox.Indicator>
          <p>No other stuff is needed here</p>
        </div>
      </Checkbox.Root>
      <div>{`${userSig.value}`}</div>
    </>
  );
});
