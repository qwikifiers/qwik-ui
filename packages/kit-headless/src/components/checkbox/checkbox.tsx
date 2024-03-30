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
} from '@builder.io/qwik';
import { CheckListContext, CheckboxContext } from './context-id';

export type CheckboxProps = {
  checkBoxSig?: Signal<boolean>;
  checkList?: boolean;
  _useCheckListContext?: boolean;
} & PropsOf<'div'>;

export const MyCheckbox = component$<CheckboxProps>((props) => {
  const defaultSig = useSignal(false);
  const appliedSig = props.checkBoxSig ?? defaultSig;
  const lol = props._useCheckListContext ? useContext(CheckListContext) : undefined;
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
      <p>Lol: {lol?.value} </p>
      <Slot />
    </div>
  );
});
