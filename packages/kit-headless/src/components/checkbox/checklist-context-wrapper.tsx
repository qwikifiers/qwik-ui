import {
  PropsOf,
  Signal,
  Slot,
  component$,
  sync$,
  useContextProvider,
  $,
  useSignal,
  useTask$,
  useComputed$,
} from '@builder.io/qwik';
import { ArrSigs, CheckListContext, CheckboxContext } from './context-id';

export type CheckListContextWrapperProps = {
  ariaLabeledBy: string;
  arrSize: number;
} & PropsOf<'div'>;

export type TriBool = boolean | 'indeterminate';
export const ChecklistContextWrapper = component$<CheckListContextWrapperProps>(
  (props) => {
    const helpme = useSignal([]);
    // this sig vals should be a prop
    const mehelp = useSignal<TriBool>(false);
    const obj = { checkboxes: helpme, checklistSig: mehelp };
    useContextProvider(CheckListContext, obj);
    useTask$(({ track }) => {
      track(() => {
        return obj.checkboxes;
      });
      console.log('here buddy');
    });
    return (
      <div role="group" aria-labelledby={props.ariaLabeledBy}>
        <p>Lokk at me: {`${123}`}</p>
        <Slot />
      </div>
    );
  },
);

export function getTriBool(boolArr: Boolean[]): TriBool {
  if (boolArr.every((e) => e === true)) {
    return true;
  }

  if (boolArr.every((e) => e === false)) {
    return false;
  }

  return 'indeterminate';
}
