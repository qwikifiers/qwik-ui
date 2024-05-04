import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { CheckboxIndicator } from 'packages/kit-headless/src/components/checkbox/checkbox-indicator';
import { Checkbox } from 'packages/kit-headless/src/components/checkbox/checkbox';
import { CheckList } from 'packages/kit-headless/src/components/checkbox/checklist';
import { Checkbox } from '@qwik-ui/headless';
export default component$(() => {
  return (
    <>
      <h3 id="test123">Pick a cat</h3>

      <CheckList class="flex flex-col gap-3" ariaLabeledBy="test123">
        <Checkbox.Root
          class="flex items-center gap-3 bg-slate-900 p-2 text-white"
          checkList={true}
        >
          <Checklist.Indicator class="w-fit bg-black">
            <div q:slot="checkbox" id="true-img">
              ✅
            </div>

            <div q:slot="checklist" id="mixed-img">
              ➖
            </div>
          </Checklist.Indicator>

          <p>Get All</p>
        </Checkbox.Root>

        <Checkbox.Root class="flex items-center gap-3 bg-slate-900 pr-2 text-white">
          <CheckboxIndicator class="w-fit bg-slate-600">✅</CheckboxIndicator>
          <p>Cat One</p>
        </Checkbox.Root>

        <Checkbox.Root class="bg-slate-900 text-white">
          <div class="flex items-center gap-3">
            <CheckboxIndicator class="w-fit bg-slate-600">✅</CheckboxIndicator>
            <p>Cat Two</p>
          </div>
        </Checkbox.Root>
      </CheckList>
    </>
  );
});
