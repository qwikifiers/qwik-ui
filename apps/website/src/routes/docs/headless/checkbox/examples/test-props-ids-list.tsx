import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Checkbox, Checklist } from '@qwik-ui/headless';
export default component$(() => {
  const firstUserSig = useSignal(true);
  const secondUserSig = useSignal(true);
  return (
    <>
      <h3 id="test123">Pick a cat</h3>
      <Checklist.Root class="flex flex-col gap-3" ariaLabeledBy="test123">
        <Checkbox.Root
          class="flex items-center gap-3 bg-slate-900 p-2 text-white"
          checklist={true}
          id="checklist"
        >
          <Checkbox.Indicator class=" flex w-[80px] justify-center bg-white p-3">
            ✅
          </Checkbox.Indicator>
          <p>Controlls all</p>
        </Checkbox.Root>
        <Checkbox.Root
          id="child-1"
          checkboxSig={firstUserSig}
          class="flex items-center gap-3 bg-slate-900 pr-2 text-white"
        >
          <Checkbox.Indicator class="w-fit bg-slate-600">✅</Checkbox.Indicator>
          <p>First Child</p>
        </Checkbox.Root>

        <Checkbox.Root id="child-2" class="bg-slate-900 text-white">
          <div class="flex items-center gap-3">
            <Checkbox.Indicator class="w-fit bg-slate-600">✅</Checkbox.Indicator>
            <p>Second child</p>
          </div>
        </Checkbox.Root>
      </Checklist.Root>
    </>
  );
});
