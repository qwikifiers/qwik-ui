import { component$, useContext, PropsOf, Slot, useTask$ } from '@builder.io/qwik';
import { CheckListContext } from './context-id';
import { props } from 'cypress/types/bluebird';

export type ChecklistIndicatorProps = PropsOf<'div'>;

export const ChecklistIndicator = component$<ChecklistIndicatorProps>((props) => {
  const { checklistSig } = useContext(CheckListContext);

  useTask$(({ track }) => {
    track(() => checklistSig.value);
    console.log('here running hlol');
  });

  // weird comparions, but it gets the right behavior
  return (
    <div {...props}>
      {checklistSig.value === true && (
        <div class={checklistSig.value === true ? 'visible' : 'invisible'}>
          <Slot name="true" />
        </div>
      )}
      {checklistSig.value === 'indeterminate' && (
        <div class={checklistSig.value === 'indeterminate' ? 'visible' : 'invisible'}>
          <Slot name="mixed" />
        </div>
      )}
    </div>
  );
});
