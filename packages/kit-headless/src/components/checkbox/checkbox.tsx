import {
  PropsOf,
  Signal,
  Slot,
  component$,
  sync$,
  useContextProvider,
  $,
  useSignal,
} from '@builder.io/qwik';
import { CheckboxContext } from './context-id';

export type CheckboxProps = {
  checkBoxSig?: Signal<boolean>;
} & PropsOf<'div'>;

export const MyCheckbox = component$<CheckboxProps>((props) => {
  const defaultSig = useSignal(true);
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
  return (
    <div
      tabIndex={0}
      role="checkbox"
      aria-checked={`${appliedSig.value}`}
      {...props}
      onKeyDown$={[handleKeyDownSync$, handleKeyDown$]}
    >
      <Slot />
    </div>
  );
});
