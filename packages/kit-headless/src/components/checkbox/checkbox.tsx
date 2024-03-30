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
  const appliedSig = hell
    ? useSignal(lol.value.every((sig) => sig.value === true))
    : props.checkBoxSig ?? defaultSig;
  useTask$(() => {
    if (lol) {
      // now i can say that there's one good application for object identity
      if (!lol.value.some((e) => e === appliedSig)) {
        lol.value = [...lol.value, appliedSig];
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
      <p>Lol: {lol?.value.toString()} </p>
      <Slot />
    </div>
  );
});
