import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { MyCheckbox, CheckboxIndicator, CheckList } from '@qwik-ui/headless';
export default component$(() => {
  return (
    <>
      <h3 id="pizza-toppings">Pizza toppings</h3>
      <CheckList ariaLabeledBy="pizza-toppings">
        <MyCheckbox
          class="flex items-center gap-3 border-2 border-black p-2 "
          checkList={true}
        >
          <CheckboxIndicator class="flex h-[25px] w-[25px] items-center justify-center bg-slate-600">
            ✅
          </CheckboxIndicator>
          Pick all toppings
        </MyCheckbox>
      </CheckList>
    </>
  );
});
