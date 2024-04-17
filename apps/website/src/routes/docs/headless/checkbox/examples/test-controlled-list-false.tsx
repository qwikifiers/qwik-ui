import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import {
  CheckboxIndicator,
  MyCheckbox,
  ChecklistIndicator,
  CheckList,
} from 'packages/kit-headless/src/components/checkbox/index';
// TODO: add logic to handle user passed sigs with trues
// this test basically ensures that the sig passed to the checklist controlls trumps all its children
export default component$(() => {
  const checklistSig = useSignal(false);
  return (
    <>
      <h3 id="test123">Pick a cat</h3>
      <CheckList class="flex flex-col gap-3" ariaLabeledBy="test123">
        <MyCheckbox
          class="flex items-center gap-3 bg-slate-900  text-white"
          checkList={true}
          checkBoxSig={checklistSig}
          id="checklist"
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
        </MyCheckbox>
        <MyCheckbox
          id="child-1"
          class="flex items-center gap-3 bg-slate-900 pr-2 text-white"
        >
          <CheckboxIndicator class="w-fit bg-slate-600">✅</CheckboxIndicator>
          <p>No other stuff is needed here</p>
        </MyCheckbox>

        <MyCheckbox id="child-2" class="bg-slate-900 text-white">
          <div class="flex items-center gap-3">
            <CheckboxIndicator class="w-fit bg-slate-600">✅</CheckboxIndicator>
            <p>Im a true.tsx</p>
          </div>
        </MyCheckbox>
      </CheckList>
      <p>You signal is: </p>
      <p id="signal-to-text">{`${checklistSig.value}`}</p>
    </>
  );
});
