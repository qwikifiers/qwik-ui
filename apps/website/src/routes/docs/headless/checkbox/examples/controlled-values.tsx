import { component$, useSignal } from '@qwik.dev/core';
import { Checkbox } from '@qwik-ui/headless';
export default component$(() => {
  const initialVal1 = false;
  const controlledSig1 = useSignal(initialVal1);
  const initialVal2 = true;
  const controlledSig2 = useSignal(initialVal2);
  return (
    <>
      <div class="flex gap-8">
        <div class="flex flex-col gap-3">
          <Checkbox.Root
            bind:checked={controlledSig1}
            id="test"
            class="flex items-center gap-3 border-2 border-black p-2 "
          >
            <Checkbox.Indicator class="flex h-[25px] w-[25px] items-center justify-center bg-slate-600">
              ✅
            </Checkbox.Indicator>
            Toggle Value
          </Checkbox.Root>
          <p>The initial value was: {`${initialVal1}`}</p>
          <p>The current value is: {`${controlledSig1.value}`}</p>
        </div>
        <div class="flex flex-col gap-3">
          <Checkbox.Root
            bind:checked={controlledSig2}
            id="test"
            class="flex items-center gap-3 border-2 border-black p-2 "
          >
            <Checkbox.Indicator class="flex h-[25px] w-[25px] items-center justify-center bg-slate-600">
              ✅
            </Checkbox.Indicator>
            Toggle Value
          </Checkbox.Root>
          <p>The initial value was: {`${initialVal2}`}</p>
          <p>The current value is: {`${controlledSig2.value}`}</p>
        </div>
      </div>
    </>
  );
});
