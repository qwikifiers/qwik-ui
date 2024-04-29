import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { CheckboxIndicator } from 'packages/kit-headless/src/components/checkbox/checkbox-indicator';
import { Checkbox } from 'packages/kit-headless/src/components/checkbox/checkbox';
import { CheckList } from 'packages/kit-headless/src/components/checkbox/checklist';
import { ChecklistIndicator } from '@qwik-ui/headless';
export default component$(() => {
  const firstUserSig = useSignal(false);
  const secondUserSig = useSignal(true);
  return (
    <>
      <h3 id="test123">Pick a cat</h3>
      <CheckList class="flex flex-col gap-3" ariaLabeledBy="test123">
        <Checkbox
          class="flex items-center gap-3 bg-slate-900 p-2 text-white"
          checkList={true}
        >
          <ChecklistIndicator class="w-fit">
            <div q:slot="checkbox" id="true-img">
              ✅
            </div>

            <div q:slot="checklist" id="mixed-img">
              ➖
            </div>
          </ChecklistIndicator>
          <p>Controlls all</p>
        </Checkbox>
        <Checkbox
          checkBoxSig={firstUserSig}
          class="flex items-center gap-3 bg-slate-900 pr-2 text-white"
        >
          <CheckboxIndicator class="w-fit bg-slate-600">✅</CheckboxIndicator>
          <p>No other stuff is needed here</p>
        </Checkbox>

        <Checkbox checkBoxSig={secondUserSig} class="bg-slate-900 text-white">
          <div class="flex items-center gap-3">
            <CheckboxIndicator class="w-fit bg-slate-600">✅</CheckboxIndicator>
            <p>No other stuff is needed here</p>
          </div>
        </Checkbox>
      </CheckList>
    </>
  );
});
