import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import {
  MyCheckbox,
  CheckboxIndicator,
  CheckList,
  ChecklistIndicator,
  Checkbox,
} from '@qwik-ui/headless';
const toppingNames = ['hot peppers', 'ham', 'pineaple', 'mushroom'];
const toppingImages = ['🌶️', '🍗', '🍍', '🍄'];
export default component$(() => {
  return (
    <>
      <h3 id="pizza-toppings">Pizza toppings</h3>
      <CheckList ariaLabeledBy="pizza-toppings" class="flex flex-col gap-4">
        <MyCheckbox
          class="flex items-center gap-3 border-2 border-black  p-2"
          checkList={true}
        >
          <ChecklistIndicator class="w-fit bg-black">
            <div q:slot="checkbox" id="true-img">
              🍕
            </div>

            <div q:slot="checklist" id="mixed-img">
              ➖
            </div>
          </ChecklistIndicator>
          Pick all toppings
        </MyCheckbox>

        {toppingNames.map((name, i) => {
          return (
            <MyCheckbox class="ml-8 flex items-center gap-3 border-2  border-black p-2">
              <CheckboxIndicator class="flex h-[25px] w-[25px] items-center justify-center bg-slate-600">
                {toppingImages[i]}
              </CheckboxIndicator>
              {name}
            </MyCheckbox>
          );
        })}
      </CheckList>
    </>
  );
});
