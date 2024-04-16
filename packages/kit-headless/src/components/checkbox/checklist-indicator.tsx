import { component$, useContext, PropsOf, Slot } from '@builder.io/qwik';
import { CheckboxContext } from './context-id';

export type ChecklistIndicatorProps = PropsOf<'div'>;

export const ChecklistIndicator = component$<ChecklistIndicatorProps>((props) => {
  const checkSig = useContext(CheckboxContext);
  return (
    <>
      <div {...props}>
        <div class={checkSig.value === true ? 'visible' : 'invisible'}>
          <Slot name="checkbox" />
        </div>
      </div>
      <div class={checkSig.value === true ? 'visible' : 'invisible'}>
        <Slot name="checklist" />
      </div>
    </>
  );
});
