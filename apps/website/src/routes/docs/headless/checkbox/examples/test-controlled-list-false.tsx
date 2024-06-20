import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Checkbox, Checklist } from '@qwik-ui/headless';
// TODO: add logic to handle user passed sigs with trues
// this test basically ensures that the sig passed to the checklist controlls trumps all its children
export default component$(() => {
  const checklistSig = useSignal(false);
  return (
    <>
      <h3 id="test123">Pick a cat</h3>
      <Checklist.Root class="flex flex-col gap-3" ariaLabeledBy="test123">
        <Checkbox.Root
          class="flex items-center gap-3 bg-slate-900  text-white"
          checklist={true}
          bind:checked={checklistSig}
          id="checklist"
        >
          <Checklist.Indicator class="w-fit">
            <div q:slot="true" id="true-img">
              ✅
            </div>

            <div q:slot="mixed" id="mixed-img">
              ➖
            </div>
          </Checklist.Indicator>
          <p>Controlls all</p>
        </Checkbox.Root>
        <Checkbox.Root
          id="child-1"
          class="flex items-center gap-3 bg-slate-900 pr-2 text-white"
        >
          <Checkbox.Indicator class="w-fit bg-slate-600">✅</Checkbox.Indicator>
          <p>No other stuff is needed here</p>
        </Checkbox.Root>

        <Checkbox.Root id="child-2" class="bg-slate-900 text-white">
          <div class="flex items-center gap-3">
            <Checkbox.Indicator class="w-fit bg-slate-600">✅</Checkbox.Indicator>
            <p>Im a true.tsx</p>
          </div>
        </Checkbox.Root>
      </Checklist.Root>
      <p>You signal is: </p>
      <p id="signal-to-text">{`${checklistSig.value}`}</p>
    </>
  );
});
