import { Signal, createContextId } from '@builder.io/qwik';
import { TriBool } from './checklist-context-wrapper';

export type ArrSigs = Signal<boolean>[];
type CheckContextObj = {
  checklistSig: Signal<TriBool>;
  checkboxes: Signal<ArrSigs>;
  idArr: string[];
};
export const CheckListContext = createContextId<CheckContextObj>('CheckList.context');
