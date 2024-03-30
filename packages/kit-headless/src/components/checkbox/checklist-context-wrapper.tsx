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
import { ArrSigs, CheckListContext, CheckboxContext } from './context-id';

export type CheckListContextWrapperProps = {
  ariaLabeledBy: string;
  arrSize: number;
} & PropsOf<'div'>;

export const ChecklistContextWrapper = component$<CheckListContextWrapperProps>(
  (props) => {
    const helpme: ArrSigs = [];
    // this sig vals should be a prop
    const mehelp = useSignal(false);
    useContextProvider(CheckListContext, { checkboxes: helpme, checklistSig: mehelp });
    return (
      <div role="group" aria-labelledby={props.ariaLabeledBy}>
        <Slot />
      </div>
    );
  },
);
