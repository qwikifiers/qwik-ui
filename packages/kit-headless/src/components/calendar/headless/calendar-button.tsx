import { $, component$, PropsOf, Slot, useContext } from '@builder.io/qwik';
import { Month, QwikDateCtxId } from './context';

export const Button = component$<PropsOf<'button'>>((props) => {
  return (
    <button {...props}>
      <Slot />
    </button>
  );
});

export const PrevButton = component$<PropsOf<typeof Button>>((props) => {
  const { monthToRender, yearToRender } = useContext(QwikDateCtxId);

  const updateDate = $(() => {
    if (monthToRender.value === '01') {
      monthToRender.value = '12';
      yearToRender.value -= 1;
      return;
    }

    monthToRender.value = String(+monthToRender.value - 1).padStart(2, '0') as Month;
  });

  return (
    <Button
      type="button"
      role="button"
      aria-label="go to previous month"
      {...props}
      onClick$={[updateDate, props.onClick$]}
    >
      <Slot />
    </Button>
  );
});

export const NextButton = component$<PropsOf<typeof Button>>((props) => {
  const { monthToRender, yearToRender } = useContext(QwikDateCtxId);

  const updateDate = $(() => {
    if (monthToRender.value === '11') {
      monthToRender.value = '01';
      yearToRender.value += 1;
      return;
    }

    monthToRender.value = String(+monthToRender.value + 1).padStart(2, '0') as Month;
  });

  return (
    <Button
      type="button"
      role="button"
      aria-label="go to next month"
      {...props}
      onClick$={[updateDate, props.onClick$]}
    >
      <Slot />
    </Button>
  );
});
