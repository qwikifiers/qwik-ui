import { component$, useContext, PropsOf, Slot } from '@builder.io/qwik';
import { CheckboxContext } from './context-id';

export type ChecklistIndicatorProps = PropsOf<'div'>;

export const ChecklistIndicator = component$<ChecklistIndicatorProps>((props) => {
  const checkSig = useContext(CheckboxContext);
  return (
    <>
      {checkSig.value === true && (
        <div class={checkSig.value === true ? 'visible' : 'invisible'}>
          <Slot name="checkbox" />
        </div>
      )}

      {checkSig.value === 'indeterminate' && (
        <div class={checkSig.value === 'indeterminate' ? 'visible' : 'invisible'}>
          <Slot name="checklist" />
        </div>
      )}
    </>
  );
});
