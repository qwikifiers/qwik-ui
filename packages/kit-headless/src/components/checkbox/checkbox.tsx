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
      if (!lol.checkboxes.some((e) => e === appliedSig)) {
        lol.checkboxes = [...lol.checkboxes, appliedSig];
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
  return (
    <div
      tabIndex={0}
      role="checkbox"
      aria-checked={`${appliedSig.value}`}
      {...props}
      onKeyDown$={[handleKeyDownSync$, handleKeyDown$]}
    >
      <p>Lol: {lol?.checkboxes.toString()} </p>
      <Slot />
    </div>
  );
});
