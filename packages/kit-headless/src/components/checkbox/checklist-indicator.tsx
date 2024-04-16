import { component$, useContext, PropsOf, Slot } from '@builder.io/qwik';
import { CheckListContext } from './context-id';

export type ChecklistIndicatorProps = PropsOf<'div'>;

export const ChecklistIndicator = component$<ChecklistIndicatorProps>(() => {
  const { checklistSig } = useContext(CheckListContext);
  // weird comparions, but it gets the right behavior
  return (
    <>
      {checklistSig.value === true && (
        <div class={checklistSig.value === true ? 'visible' : 'invisible'}>
          <Slot name="checkbox" />
        </div>
      )}

      {checklistSig.value === 'indeterminate' && (
        <div class={checklistSig.value === 'indeterminate' ? 'visible' : 'invisible'}>
          <Slot name="checklist" />
        </div>
      )}

      {checklistSig.value === false && (
        <div class="invisible">
          <Slot name="checklist" />
        </div>
      )}
    </>
  );
});
