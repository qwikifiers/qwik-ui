import {
  PropsOf,
  Signal,
  Slot,
  component$,
  sync$,
  useContextProvider,
  useContext,
  $,
  useSignal,
  useTask$,
} from '@builder.io/qwik';
import { CheckListContext, CheckboxContext } from './context-id';
import { TriBool, getTriBool } from './checklist-context-wrapper';
export type TriStateCheckboxProps = {
  checkBoxSig?: Signal<boolean>;
  checkList?: boolean;
  _useCheckListContext?: boolean;
  _overWriteCheckbox?: boolean;
} & PropsOf<'div'>;
export type TwoStateCheckboxProps = {
  checkBoxSig?: Signal<boolean>;
  _useCheckListContext?: boolean;
  _overWriteCheckbox?: boolean;
} & PropsOf<'div'>;

type TwoStateCheckboxBehaviorProps = {
  checkboxSig: Signal<boolean>;
} & PropsOf<'div'>;
export type ChecklistTwoStateCheckboxProps = {
  checkBoxSig?: Signal<boolean>;
  _useCheckListContext?: boolean;
  _overWriteCheckbox?: boolean;
} & PropsOf<'div'>;
export const MyCheckbox = component$<TriStateCheckboxProps>((props) => {
  // this is done to avoid consumers dealing with two types checkboxes, could go in different files
  if (props._useCheckListContext && !props.checkList) {
    console.log('using chechlist');
  }
  if (props.checkList) {
    return (
      <TriStateCheckbox {...props}>
        <Slot />
      </TriStateCheckbox>
    );
  }
  if (props._useCheckListContext) {
    console.log('using checklist checkbox');
    return (
      <ChecklistTwoStateCheckbox {...props}>
        <Slot />
      </ChecklistTwoStateCheckbox>
    );
  }
  return (
    <TwoStateCheckbox {...props}>
      <Slot />
    </TwoStateCheckbox>
  );
});

function getAriaChecked(triBool: TriBool): 'mixed' | 'true' | 'false' {
  if (triBool === 'indeterminate') {
    return 'mixed';
  }
  return `${triBool === true}`;
}

export const TwoStateCheckbox = component$<TwoStateCheckboxProps>((props) => {
  // all the sig stuff should be refactored into a fancy hook
  const defaultSig = useSignal(false);
  const appliedSig = props.checkBoxSig ?? defaultSig;
  const checklistID = useSignal<string | undefined>(props.id);
  useContextProvider(CheckboxContext, appliedSig);
  return (
    <TwoStateCheckboxBehavior
      checkboxSig={appliedSig}
      tabIndex={0}
      role="checkbox"
      aria-checked={getAriaChecked(appliedSig.value)}
      {...props}
      id={checklistID.value}
    >
      <Slot />
    </TwoStateCheckboxBehavior>
  );
});

export const ChecklistTwoStateCheckbox = component$<ChecklistTwoStateCheckboxProps>(
  (props) => {
    // this code is duplicate bcs you cant use conditionals on hooks (checklistContext could be undefined)
    // this has room for improvement: remove most of the code duplivation
    // making this a wrapper over the simpler component or using hooks
    const checklistContext = useContext(CheckListContext);
    const defaultSig = useSignal(false);
    const appliedSig = props.checkBoxSig ?? defaultSig;
    const checklistID = useSignal<string | undefined>(props.id);
    // makes sure that the checklist's value is the same as its child
    const syncToChecklist = useSignal<undefined | boolean>(props._overWriteCheckbox);
    useContextProvider(CheckboxContext, appliedSig);
    useTask$(({ track }) => {
      console.log('overwrite: ', props._overWriteCheckbox, appliedSig.value);

      if (syncToChecklist.value !== undefined) {
        console.log('change here ');
        appliedSig.value = syncToChecklist.value;
        syncToChecklist.value = undefined;
      }
      track(() => {
        appliedSig.value;
      });

      // now i can say that there's one good application for object identity
      if (!checklistContext.checkboxes.value.some((e) => e === appliedSig)) {
        const currIndex = checklistContext.checkboxes.value.length;
        console.log('INSERTING ', checklistContext.idArr[currIndex]);
        // TODO: refactor id to not run on wrapper but after conditional
        if (checklistID.value === undefined) {
          checklistID.value = checklistContext.idArr[currIndex];
        } else {
          checklistContext.idArr[currIndex] = checklistID.value;
        }
        checklistContext.checkboxes.value = [
          ...checklistContext.checkboxes.value,
          appliedSig,
        ];
      }

      const boolArr = checklistContext?.checkboxes.value.map((e) => e.value);
      const newVal = getTriBool(boolArr);
      checklistContext.checklistSig.value = newVal;
    });
    return (
      <TwoStateCheckboxBehavior
        {...props}
        tabIndex={0}
        role="checkbox"
        aria-checked={getAriaChecked(appliedSig.value)}
        id={checklistID.value}
        checkboxSig={appliedSig}
      >
        <Slot />
      </TwoStateCheckboxBehavior>
    );
  },
);

export const TriStateCheckbox = component$<TriStateCheckboxProps>((props) => {
  // all the sig stuff should be refactored into a fancy hook
  const checklistContext = useContext(CheckListContext);
  const childCheckboxes = checklistContext.checkboxes;
  const appliedSig = props.checkBoxSig ?? checklistContext.checklistSig;
  const ariaControlsStrg = checklistContext.idArr.reduce((p, c) => p + ' ' + c);
  useContextProvider(CheckboxContext, appliedSig);
  useTask$(() => {});

  // im not enterily sure why, but the if statement only runs once
  if (props.checkBoxSig !== undefined) {
    checklistContext.checklistSig = props.checkBoxSig;
  }
  const handleKeyDownSync$ = sync$((e: KeyboardEvent) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
  });
  const handleKeyDown$ = $((e: KeyboardEvent) => {
    if (e.key === ' ') {
      if (appliedSig.value !== true) {
        appliedSig.value = true;
        childCheckboxes.value.forEach((sig) => (sig.value = true));
        return;
      }
      appliedSig.value = false;
      childCheckboxes.value.forEach((sig) => (sig.value = false));
    }
  });
  return (
    <div
      tabIndex={0}
      role="checkbox"
      aria-checked={getAriaChecked(appliedSig.value)}
      onKeyDown$={[handleKeyDownSync$, handleKeyDown$]}
      aria-controls={ariaControlsStrg}
      {...props}
    >
      <Slot />
    </div>
  );
});

const TwoStateCheckboxBehavior = component$<TwoStateCheckboxBehaviorProps>((props) => {
  const handleKeyDownSync$ = sync$((e: KeyboardEvent) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
  });
  // this logic is duplicared thrice, make into hook pls
  const handleClick = $(() => {
    props.checkboxSig.value = !props.checkboxSig.value;
  });
  const handleKeyDown$ = $((e: KeyboardEvent) => {
    if (e.key === ' ') {
      props.checkboxSig.value = !props.checkboxSig.value;
    }
  });
  // TODO: refactor to usetask code into fancy hook thingy
  return (
    <div
      tabIndex={0}
      role="checkbox"
      aria-checked={getAriaChecked(props.checkboxSig.value)}
      {...props}
      onKeyDown$={[handleKeyDownSync$, handleKeyDown$]}
      onClick$={handleClick}
    >
      <Slot />
    </div>
  );
});
