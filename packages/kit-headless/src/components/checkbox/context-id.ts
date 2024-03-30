import { Signal, createContextId } from '@builder.io/qwik';

export type ArrSigs = Signal<boolean>[];
type CheckContextObj = {
  checklistSig: Signal<boolean>;
  checkboxes: ArrSigs;
};
export const CheckboxContext = createContextId<Signal<boolean>>('CheckBox.context');
export const CheckListContext = createContextId<CheckContextObj>('CheckList.context');
