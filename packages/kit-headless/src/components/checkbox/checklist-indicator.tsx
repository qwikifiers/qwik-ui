import { component$, useContext, PropsOf, Slot } from '@builder.io/qwik';
import { CheckListContext } from './context-id';
import { props } from 'cypress/types/bluebird';

export type ChecklistIndicatorProps = PropsOf<'div'>;

export const ChecklistIndicator = component$<ChecklistIndicatorProps>((props) => {
  const { checklistSig } = useContext(CheckListContext);
  // weird comparions, but it gets the right behavior
  return (
    <div {...props}>
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
    </div>
  );
});
