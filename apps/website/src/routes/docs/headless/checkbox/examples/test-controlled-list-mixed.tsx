import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { CheckboxIndicator } from 'packages/kit-headless/src/components/checkbox/checkbox-indicator';
import { Checkbox } from 'packages/kit-headless/src/components/checkbox/checkbox';
import { Checklist } from 'packages/kit-headless/src/components/checkbox/checklist';
import { Checkbox } from '@qwik-ui/headless';
export default component$(() => {
  const firstUserSig = useSignal(false);
  const secondUserSig = useSignal(true);
  return (
    <>
      <h3 id="test123">Pick a cat</h3>
      <Checklist class="flex flex-col gap-3" ariaLabeledBy="test123">
        <Checkbox.Root
          class="flex items-center gap-3 bg-slate-900 p-2 text-white"
          checklist={true}
        >
          <Checklist.Indicator class="w-fit">
            <div q:slot="checkbox" id="true-img">
              ✅
            </div>

            <div q:slot="checklist" id="mixed-img">
              ➖
            </div>
          </Checklist.Indicator>
          <p>Controlls all</p>
        </Checkbox.Root>
        <Checkbox.Root
          checkBoxSig={firstUserSig}
          class="flex items-center gap-3 bg-slate-900 pr-2 text-white"
        >
          <CheckboxIndicator class="w-fit bg-slate-600">✅</CheckboxIndicator>
          <p>No other stuff is needed here</p>
        </Checkbox.Root>

        <Checkbox.Root checkBoxSig={secondUserSig} class="bg-slate-900 text-white">
          <div class="flex items-center gap-3">
            <CheckboxIndicator class="w-fit bg-slate-600">✅</CheckboxIndicator>
            <p>No other stuff is needed here</p>
          </div>
        </Checkbox.Root>
      </Checklist>
    </>
  );
});
