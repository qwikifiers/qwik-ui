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
import { TriBool, getTriBool } from '../checklist/checklist-context-wrapper';
export type MixedStateCheckboxProps = {
  'bind:checked'?: Signal<boolean>;
  checklist?: boolean;
  _useCheckListContext?: boolean;
  _overWriteCheckbox?: boolean;
} & PropsOf<'div'>;
export type TwoStateCheckboxProps = {
  'bind:checked'?: Signal<boolean>;
  _useCheckListContext?: boolean;
  _overWriteCheckbox?: boolean;
} & PropsOf<'div'>;

type TwoStateCheckboxBehaviorProps = {
  checkboxSig: Signal<boolean>;
} & PropsOf<'div'>;
export type ChecklistTwoStateCheckboxProps = {
  'bind:checked'?: Signal<boolean>;
  _useCheckListContext?: boolean;
  _overWriteCheckbox?: boolean;
} & PropsOf<'div'>;
export const CheckboxRoot = component$<MixedStateCheckboxProps>((props) => {
  // this is done to avoid consumers dealing with two types checkboxes, could go in different files
  if (props.checklist) {
    return (
      <MixedStateCheckbox {...props}>
        <Slot />
      </MixedStateCheckbox>
    );
  }
  if (props._useCheckListContext) {
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
  const appliedSig = props['bind:checked'] ?? defaultSig;
  const checklistID = useSignal<string | undefined>(props.id);
  useContextProvider(CheckboxContext, appliedSig);
  return (
    <TwoStateCheckboxBehavior
      bind:checked={appliedSig}
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
    const appliedSig = props['bind:checked'] ?? defaultSig;
    const checklistID = useSignal<string | undefined>(props.id);
    // makes sure that the checklist's value is the same as its child
    const syncToChecklist = useSignal<undefined | boolean>(props._overWriteCheckbox);
    useContextProvider(CheckboxContext, appliedSig);
    useTask$(({ track }) => {
      if (syncToChecklist.value !== undefined) {
        appliedSig.value = syncToChecklist.value;
        syncToChecklist.value = undefined;
      }
      track(() => {
        appliedSig.value;
      });

      // now i can say that there's one good application for object identity
      if (!checklistContext.checkboxes.value.some((e) => e === appliedSig)) {
        const currIndex = checklistContext.checkboxes.value.length;

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
        bind:checked={appliedSig}
      >
        <Slot />
      </TwoStateCheckboxBehavior>
    );
  },
);

export const MixedStateCheckbox = component$<MixedStateCheckboxProps>((props) => {
  console.log('mixed');

  // all the sig stuff should be refactored into a fancy hook
  const checklistContext = useContext(CheckListContext);
  const childCheckboxes = checklistContext.checkboxes;
  const appliedSig = props['bind:checked'] ?? checklistContext.checklistSig;
  const ariaControlsStrg =
    checklistContext.idArr.length === 0
      ? ''
      : checklistContext.idArr.reduce((p, c) => p + ' ' + c);
  useContextProvider(CheckboxContext, appliedSig);

  // im not enterily sure why, but the if statement only runs once
  if (props['bind:checked'] !== undefined) {
    checklistContext.checklistSig = props['bind:checked'];
  }

  const changeChecklistSig = $(() => {
    if (appliedSig.value !== true) {
      appliedSig.value = true;
      childCheckboxes.value.forEach((sig) => (sig.value = true));
      return;
    }
    appliedSig.value = false;
    childCheckboxes.value.forEach((sig) => (sig.value = false));
  });
  const handleKeyDownSync$ = sync$((e: KeyboardEvent) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
  });
  const handleKeyDown$ = $((e: KeyboardEvent) => {
    if (e.key === ' ') {
      changeChecklistSig();
    }
  });
  const handleClick$ = $(() => {
    changeChecklistSig();
  });

  return (
    <div
      tabIndex={0}
      role="checkbox"
      aria-checked={getAriaChecked(appliedSig.value)}
      onKeyDown$={[handleKeyDownSync$, handleKeyDown$]}
      aria-controls={ariaControlsStrg}
      onClick$={[handleClick$]}
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
    props['bind:checked'].value = !props['bind:checked'].value;
  });
  const handleKeyDown$ = $((e: KeyboardEvent) => {
    if (e.key === ' ') {
      props['bind:checked'].value = !props['bind:checked'].value;
    }
  });
  // TODO: refactor to usetask code into fancy hook thingy
  return (
    <div
      tabIndex={0}
      role="checkbox"
      aria-checked={getAriaChecked(props['bind:checked'].value)}
      {...props}
      onKeyDown$={[handleKeyDownSync$, handleKeyDown$]}
      onClick$={handleClick}
    >
      <Slot />
    </div>
  );
});
