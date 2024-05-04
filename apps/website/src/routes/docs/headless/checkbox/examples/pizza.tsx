import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { Checkbox } from '@qwik-ui/headless';
const toppingNames = ['hot peppers', 'ham', 'pineaple', 'mushroom'];
const toppingImages = ['🌶️', '🍗', '🍍', '🍄'];
export default component$(() => {
  return (
    <>
      <h3 id="pizza-toppings">Pizza toppings</h3>
      <CheckList ariaLabeledBy="pizza-toppings" class="flex flex-col gap-4">
        <Checkbox.Root
          class="flex items-center gap-3 border-2 border-black  p-2"
          checkList={true}
        >
          <Checklist.Indicator class="flex h-[25px] w-[25px] items-center justify-center bg-slate-600">
            <div q:slot="checkbox" id="true-img">
              🍕
            </div>

            <div q:slot="checklist" id="mixed-img">
              ➖
            </div>
          </Checklist.Indicator>
          Pick all toppings
        </Checkbox.Root>

        {toppingNames.map((name, i) => {
          return (
            <Checkbox.Root class="ml-8 flex items-center gap-3 border-2  border-black p-2">
              <CheckboxIndicator class="flex h-[25px] w-[25px] items-center justify-center bg-slate-600">
                {toppingImages[i]}
              </CheckboxIndicator>
              {name}
            </Checkbox.Root>
          );
        })}
      </CheckList>
    </>
  );
});
