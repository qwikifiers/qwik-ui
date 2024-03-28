import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import styles from '../snippets/select.css?inline';
import { CheckboxIndicator } from 'packages/kit-headless/src/components/checkbox/checkbox-indicator';
import { MyCheckbox } from 'packages/kit-headless/src/components/checkbox/checkbox';

export default component$(() => {
  const userSig = useSignal(true);
  return (
    <>
      <MyCheckbox class="bg-slate-900 text-white" checkBoxSig={userSig}>
        <div class="flex items-center gap-3">
          <CheckboxIndicator class="w-fit bg-slate-600">
            <img
              src="https://cataas.com/cat?width=80&height=80"
              alt="cat"
              width={80}
              height={80}
            />
          </CheckboxIndicator>
          <p>No other stuff is needed here</p>
        </div>
      </MyCheckbox>
      <div>{`${userSig.value}`}</div>
    </>
  );
});
