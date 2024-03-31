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
  useVisibleTask$,
  useTask$,
} from '@builder.io/qwik';
import { CheckListContext, CheckboxContext } from './context-id';
import { TriBool, getTriBool } from './checklist-context-wrapper';

export type CheckboxProps = {
  checkBoxSig?: Signal<boolean>;
  checkList?: boolean;
  _useCheckListContext?: boolean;
} & PropsOf<'div'>;

export const MyCheckbox = component$<CheckboxProps>((props) => {
  // this is done to avoid consumers dealing with two types checkboxes, could go in different files
  if (props.checkList) {
    return (
      <TriStateCheckbox {...props}>
        <Slot />
      </TriStateCheckbox>
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

export const TwoStateCheckbox = component$<CheckboxProps>((props) => {
  // all the sig stuff should be refactored into a fancy hook
  const checklistContext = props._useCheckListContext
    ? useContext(CheckListContext)
    : undefined;
  const defaultSig = useSignal(false);
  const appliedSig = props.checkBoxSig ?? defaultSig;
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
    if (checklistContext?.checkboxes === undefined) {
      return;
    }
    track(() => {
      appliedSig.value;
    });

    if (checklistContext) {
      // now i can say that there's one good application for object identity
      if (!checklistContext.checkboxes.value.some((e) => e === appliedSig)) {
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
    >
      <p>Lol: {`${appliedSig.value}`} </p>
      <Slot />
    </div>
  );
});

export const TriStateCheckbox = component$<CheckboxProps>((props) => {
  // all the sig stuff should be refactored into a fancy hook
  const checklistContext = useContext(CheckListContext);
  const appliedSig = checklistContext.checklistSig;
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
  return (
    <div
      tabIndex={0}
      role="checkbox"
      aria-checked={getAriaChecked(appliedSig.value)}
      {...props}
      onKeyDown$={[handleKeyDownSync$, handleKeyDown$]}
      aria-controls="here lol"
    >
      <p>Lol: {`${appliedSig.value}`} </p>
      <Slot />
    </div>
  );
});
