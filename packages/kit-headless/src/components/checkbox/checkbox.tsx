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
import { getTriBool } from './checklist-context-wrapper';

export type CheckboxProps = {
  checkBoxSig?: Signal<boolean>;
  checkList?: boolean;
  _useCheckListContext?: boolean;
} & PropsOf<'div'>;

export const MyCheckbox = component$<CheckboxProps>((props) => {
  // all the sig stuff should be refactored into a fancy hook
  const lol = props._useCheckListContext ? useContext(CheckListContext) : undefined;
  const defaultSig = useSignal(false);
  const hell = lol !== undefined && props.checkList;
  const appliedSig = hell ? lol.checklistSig : props.checkBoxSig ?? defaultSig;
  useTask$(() => {
    // TODO: refactor to "add to context function thingy"
    if (lol && !props.checkList) {
      // now i can say that there's one good application for object identity
      if (!lol.checkboxes.value.some((e) => e === appliedSig)) {
        lol.checkboxes.value = [...lol.checkboxes.value, appliedSig as Signal<boolean>];
      }
    }
  });
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
  useTask$(({ track }) => {
    if (!props._useCheckListContext || lol?.checkboxes === undefined) {
      return;
    }
    track(() => {
      appliedSig.value;
    });

    console.log('om the besto');
    const boolArr = lol?.checkboxes.value.map((e) => e.value);
    const newVal = getTriBool(boolArr);
    lol.checklistSig.value = newVal;
    console.log('new val: ', newVal, boolArr);
  });
  return (
    <div
      tabIndex={0}
      role="checkbox"
      aria-checked={`${appliedSig.value === true}`}
      {...props}
      onKeyDown$={[handleKeyDownSync$, handleKeyDown$]}
    >
      <p>Lol: {`${appliedSig.value}`} </p>
      <Slot />
    </div>
  );
});
