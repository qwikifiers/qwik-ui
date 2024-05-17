import { component$, useContext, PropsOf, Slot, useTask$ } from '@builder.io/qwik';
import { CheckListContext } from './context-id';

export type ChecklistIndicatorProps = PropsOf<'div'>;

export const ChecklistIndicator = component$<ChecklistIndicatorProps>((props) => {
  const { checklistSig } = useContext(CheckListContext);

  useTask$(({ track }) => {
    track(() => checklistSig.value);
  });

  // weird comparions, but it gets the right behavior
  return (
    <div {...props}>
      <p>Here lol: {JSON.stringify(checklistSig.value)}</p>
      {checklistSig.value === true && (
        <div>
          <Slot name="true" />
        </div>
      )}
      {checklistSig.value === 'indeterminate' && (
        <div>
          <Slot name="mixed" />
        </div>
      )}
    </div>
  );
});
