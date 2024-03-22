import {
  PropsOf,
  Signal,
  Slot,
  component$,
  useContextProvider,
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
  return (
    <div role="checkbox" aria-checked={`${appliedSig.value}`} {...props}>
      <Slot />
    </div>
  );
});
