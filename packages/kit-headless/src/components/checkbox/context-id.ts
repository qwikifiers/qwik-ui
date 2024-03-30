import { Signal, createContextId } from '@builder.io/qwik';

export const CheckboxContext = createContextId<Signal<boolean>>('CheckBox.context');
export const CheckListContext = createContextId<Signal<boolean>>('CheckList.context');
