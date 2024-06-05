import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Checkbox } from '@qwik-ui/headless';
export default component$(() => {
  const controlledSig = useSignal(false);
  return (
    <>
      <div class="flex flex-col gap-3">
        <Checkbox.Root
          bind:checked={controlledSig}
          id="test"
          class="flex items-center gap-3 border-2 border-black p-2 "
        >
          <Checkbox.Indicator class="flex h-[25px] w-[25px] items-center justify-center bg-slate-600">
            ✅
          </Checkbox.Indicator>
          Toggle Signal
        </Checkbox.Root>
        <p>Your signal's value is: {`${controlledSig.value}`}</p>
      </div>
    </>
  );
});
