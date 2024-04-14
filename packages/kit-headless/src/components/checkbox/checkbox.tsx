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
import { log } from 'console';

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
  // huh???
  const checkboxOverWrite = useSignal<undefined | boolean>(props._overWriteCheckbox);
  useContextProvider(CheckboxContext, appliedSig);
  const handleKeyDownSync$ = sync$((e: KeyboardEvent) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
  });
  const handleKeyDown$ = $((e: KeyboardEvent) => {
    if (e.key === ' ') {
      appliedSig.value = !appliedSig.value;
    }
  });
  // TODO: refactor to usetask code into fancy hook thingy
  useTask$(({ track }) => {
    if (checkboxOverWrite.value !== undefined) {
      console.log('CHANGE ME LOL');
      appliedSig.value = checkboxOverWrite.value;
      checkboxOverWrite.value = undefined;
    }
    track(() => {
      appliedSig.value;
    });
  });
  return (
    <div
      tabIndex={0}
      role="checkbox"
      aria-checked={getAriaChecked(appliedSig.value)}
      {...props}
      onKeyDown$={[handleKeyDownSync$, handleKeyDown$]}
      id={checklistID.value}
    >
      <p>Lol: {`${appliedSig.value}`} </p>
      <Slot />
    </div>
  );
});

export const ChecklistTwoStateCheckbox = component$<ChecklistTwoStateCheckboxProps>(
  (props) => {
    // this code is duplicate bcs you cant use conditionals on hooks (checklistContext could be undefined)
    // this has room for improvement: remove most of the code duplivation
    const checklistContext = useContext(CheckListContext);
    const defaultSig = useSignal(false);
    const appliedSig = props.checkBoxSig ?? defaultSig;
    const checklistID = useSignal<string | undefined>(props.id);
    // huh???
    const checkboxOverWrite = useSignal<undefined | boolean>(props._overWriteCheckbox);
    useContextProvider(CheckboxContext, appliedSig);
    const handleKeyDownSync$ = sync$((e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault();
      }
    });
    const handleKeyDown$ = $((e: KeyboardEvent) => {
      if (e.key === ' ') {
        appliedSig.value = !appliedSig.value;
      }
    });

    // TODO: refactor to usetask code into fancy hook thingy
    useTask$(({ track }) => {
      console.log('overwrite: ', props._overWriteCheckbox, appliedSig.value);

      if (checkboxOverWrite.value !== undefined) {
        console.log('change here ');
        appliedSig.value = checkboxOverWrite.value;
        checkboxOverWrite.value = undefined;
      }
      track(() => {
        appliedSig.value;
      });

      if (checklistContext) {
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
      }
      const boolArr = checklistContext?.checkboxes.value.map((e) => e.value);
      const newVal = getTriBool(boolArr);
      checklistContext.checklistSig.value = newVal;
    });
    return (
      <div
        tabIndex={0}
        role="checkbox"
        aria-checked={getAriaChecked(appliedSig.value)}
        {...props}
        onKeyDown$={[handleKeyDownSync$, handleKeyDown$]}
        id={checklistID.value}
      >
        <p>Lol: {`${appliedSig.value}`} </p>
        <Slot />
      </div>
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
      <p>IS: {getAriaChecked(appliedSig.value)}</p>
      <Slot />
    </div>
  );
});
