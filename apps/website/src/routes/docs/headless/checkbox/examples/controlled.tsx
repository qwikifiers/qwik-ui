import { component$, useSignal } from '@builder.io/qwik';
import { Checkbox } from '@qwik-ui/headless';
export default component$(() => {
  const initialVal1 = false;
  const controlledSig1 = useSignal(initialVal1);
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
        </div>
      </div>
    </>
  );
});
