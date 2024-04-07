import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { CheckboxIndicator } from 'packages/kit-headless/src/components/checkbox/checkbox-indicator';
import { MyCheckbox } from 'packages/kit-headless/src/components/checkbox/checkbox';

export default component$(() => {
  const userSig = useSignal(true);
  return (
    <>
      <MyCheckbox class="bg-slate-900 text-white" checkBoxSig={userSig}>
        <div class="flex items-center gap-3">
          <CheckboxIndicator class="w-fit bg-slate-600">
            <p id="indicator">✅</p>
          </CheckboxIndicator>
          <p>No other stuff is needed here</p>
        </div>
      </MyCheckbox>
      <div>{`${userSig.value}`}</div>
    </>
  );
});
