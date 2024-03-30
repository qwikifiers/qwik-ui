import { Signal, createContextId } from '@builder.io/qwik';

type ArrSigs = Signal<boolean>[];
export const CheckboxContext = createContextId<Signal<boolean>>('CheckBox.context');
export const CheckListContext = createContextId<Signal<ArrSigs>>('CheckList.context');
