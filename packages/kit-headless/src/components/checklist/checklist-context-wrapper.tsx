import {
  PropsOf,
  Slot,
  useId,
  component$,
  useContextProvider,
  useSignal,
  useTask$,
} from '@builder.io/qwik';
import { CheckListContext } from './context-id';

export type CheckListContextWrapperProps = {
  ariaLabeledBy: string;
  arrSize: number;
  idArr: Array<false | string>;
  initialTriBool: TriBool;
} & PropsOf<'div'>;

export type TriBool = boolean | 'indeterminate';
export const ChecklistContextWrapper = component$<CheckListContextWrapperProps>(
  (props) => {
    const helpme = useSignal([]);
    const idArr: string[] = [];
    // this sig vals should be a prop
    const mehelp = useSignal<TriBool>(props.initialTriBool);
    const id = useId();
    for (let index = 0; index < props.arrSize; index++) {
      if (props.idArr[index] != false) {
        idArr.push(props.idArr[index] as string);
        continue;
      }

      const uniqId = id + index.toString();
      idArr.push(uniqId);
    }
    const obj = { checkboxes: helpme, checklistSig: mehelp, idArr };
    useContextProvider(CheckListContext, obj);
    useTask$(({ track }) => {
      track(() => {
        return obj.checkboxes;
      });
    });
    return (
      <div role="group" aria-labelledby={props.ariaLabeledBy}>
        <Slot />
      </div>
    );
  },
);

export function getTriBool(boolArr: boolean[]): TriBool {
  if (boolArr.length === 0) {
    return 'indeterminate';
  }
  if (boolArr.every((e) => e === true)) {
    return true;
  }

  if (boolArr.every((e) => e === false)) {
    return false;
  }

  return 'indeterminate';
}
