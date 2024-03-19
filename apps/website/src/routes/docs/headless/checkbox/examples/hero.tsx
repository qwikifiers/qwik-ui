import { component$, useSignal } from '@builder.io/qwik';
import {
  Checkbox,
  CheckboxIndicator,
  CheckboxLabel,
} from '../../../../../../../../packages/kit-headless/src/components/checkbox/index';
export default component$(() => {
  return (
    <>
      <Checkbox>
        <div class="flex gap-3">
          <CheckboxIndicator class="flex h-6 w-6 items-center justify-center rounded-md border-2 border-white">
            ✅
          </CheckboxIndicator>
          <div>Accept terms</div>
        </div>
      </Checkbox>
    </>
  );
});
